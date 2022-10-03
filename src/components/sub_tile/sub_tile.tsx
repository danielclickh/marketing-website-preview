import React from 'react'
import Link from '@docusaurus/Link'

type ButtonProps = {
	title: string
	description: string
	url: string
	background: string
}

export function SubTile(props: ButtonProps) {
	const { title, description, url, background } = props
	return (
		<>
		   <div className="sub_tile">
				<p className="description">{description}</p>
			</div>
		</>
	)
}
