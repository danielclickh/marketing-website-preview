import React from 'react'
import { SubTile } from '../sub_tile'

type ListProps = {
	items: [title: any, description: string, url: string, vimeo_id: string]
}

export function TwoColumnVideos(props: ListProps) {
	return (
		<div className="two_column_home_videos">
			{props.items.map((item, index) => (
			<>
				{/* <SubTile
					key={index}
					title={item.title}
					description={item.description}
					url={item.url}
					background={item.background}
				/> */}
				<div className="video_container">
					<iframe
						className="video"
						src={"https://player.vimeo.com/video/" + item.vimeo_id}
						width="100%"
						height="275"
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture"
					></iframe>
				</div>
			</>
			))}

		</div>
	)
}
