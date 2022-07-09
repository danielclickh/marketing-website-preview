import {ChangeDetectionStrategy, ChangeDetectorRef, Component} from '@angular/core';
import {ThemeService} from "../common/services/theme.service";
import {CareersService} from "./careers.service";
import {Position, PositionOffice} from "./careers.protocol";

export interface PositionsAndMetadata {
  offices: Array<{ name: string; id: number }>;
  departments: Array<{ name: string; id: number }>;
  positions: Array<{
    positions: Array<Position>;
    department: { name: string; id: number };
  }>
}

@Component({
  selector: 'app-careers',
  templateUrl: './careers.component.html',
  styleUrls: ['./careers.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CareersComponent {
  careersDataPromise = this.careersService.getCareersData();
  themeObs = this.themeService.observeTheme();
  officeToPositionMap = new Map<number, Array<Position>>();
  departmentToPositionMap = new Map<number, Array<Position>>();
  selectedOffice: number | undefined = undefined;
  selectedDepartment: number | undefined = undefined;
  searchText: string = '';
  private officeIdToNameMap = new Map<number, string>();
  private departmentIdToNameMap = new Map<number, string>();

  constructor(private readonly careersService: CareersService,
              private readonly themeService: ThemeService,
              private readonly cd: ChangeDetectorRef) {
    this.populatePositions().then()
  }

  getPositionsAndMetadata(): PositionsAndMetadata | undefined {
    if (this.departmentToPositionMap.size === 0) {
      return undefined;
    }

    const departments = [...this.departmentIdToNameMap.entries()].map(([id, name]) => {
      return {id, name}
    });

    const offices = [...this.officeIdToNameMap.entries()].map(([id, name]) => {
      return {id, name}
    });

    const positions = departments
      .filter(department => {
        return this.selectedDepartment === undefined || department.id === this.selectedDepartment
      })
      .map((department) => {
        const positions = this.departmentToPositionMap.get(department.id)!
          .filter((position) => {
            if (this.searchText !== undefined) {
              const foundMatches = this.searchText.toLowerCase().trim().split(' ').every(keyword => {
                const title = position.title.toLowerCase();
                const office = this.getOfficeNames(position.offices).toLowerCase();
                return title.includes(keyword) || office.includes(keyword);
              });
              if (!foundMatches) {
                return false;
              }
            }
            return (this.selectedOffice === undefined || position.offices.some(office => office.id === this.selectedOffice))
          })
        return {department, positions}
      });

    return {
      offices,
      departments,
      positions
    }
  }

  selectOffice(officeId: number | undefined) {
    this.selectedOffice = officeId;
  }

  selectDepartment(departmentId: number | undefined) {
    this.selectedDepartment = departmentId;
  }

  getOfficeNames(offices: Array<PositionOffice>): string {
    return offices.map(office => office.name).join(', ');
  }

  private async populatePositions() {
    const positions = await this.careersService.getOpenPositions();
    for (const position of positions) {
      for (const office of position.offices) {
        const officePositions = this.officeToPositionMap.get(office.id) || [];
        officePositions.push(position);
        this.officeToPositionMap.set(office.id, officePositions);
        this.officeIdToNameMap.set(office.id, office.name);
      }

      for (const department of position.departments) {
        const departmentPositions = this.departmentToPositionMap.get(department.id) || [];
        departmentPositions.push(position);
        this.departmentToPositionMap.set(department.id, departmentPositions);
        this.departmentIdToNameMap.set(department.id, department.name);
      }
    }
    this.cd.detectChanges();
  }
}
