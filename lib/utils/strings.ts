type SlugifyOptions = {
    separator: string,
    maxLength: number,
    enforceLowercase: boolean,
    dictionary: {[key: string|number]: string},
}

const slugifyDefaults: SlugifyOptions = {
    separator:  '-',
    maxLength: 0,
    enforceLowercase: true,
    dictionary: {
        '&': 'and',
        '@': 'at'
    }
}

/**
 * Slugify a string replacing any white space and spacial characters with `separator` param.
 */
export function slugify(string: string, options?: SlugifyOptions): string {

    const {
        separator = slugifyDefaults.separator,
        maxLength = slugifyDefaults.maxLength,
        enforceLowercase = slugifyDefaults.enforceLowercase,
        dictionary = slugifyDefaults.dictionary
    } = options || slugifyDefaults

    const charPattern = new RegExp(`[^a-z0-9\s${separator}]`, 'gi');

    // Setup our base slug value.
    let slug = (string || '').toString();

    // Replace dictionary key-pairs.
    for (const key in dictionary) {
        slug = slug.replaceAll(key, dictionary[key]);
    }

    // Normalise string and remove unwanted characters.
    slug = slug
        .normalize('NFD') // Split an accented letter in the base letter and the acent
        .replace(/[\u0300-\u036f]/g, '') // Remove all previously split accents
        .replace(charPattern, ' ') // Remove all chars not letters, numbers and spaces (to be replaced)
        .trim()
        .replace(/\s+/g, separator);

    // Limit slug length.
    if (maxLength > 0) {
        slug = slug.substring(0, maxLength);
    }

    // Enforce lowered case.
    if (enforceLowercase) {
        slug = slug.toLowerCase();
    }

    return slug;
}
