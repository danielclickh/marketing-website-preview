#!/bin/bash

ENV="${ENV:-../cms/.env}"

source $ENV
## Query Blog posts
mysql -u $DATABASE_USERNAME -p$DATABASE_PASSWORD -h $DATABASE_HOST -D $DATABASE_NAME -e "select slug from blog_posts where published_at is not null;" -N > routes.txt
## Append prefix /blog/ to all blog post slugs
awk '$0="/blog/"$0' routes.txt > new_routes.txt
## Query all Events
mysql -u $DATABASE_USERNAME -p$DATABASE_PASSWORD -h $DATABASE_HOST -D $DATABASE_NAME -e "select slug from events;" -N > routes.txt
## Append prefix /company/events/ to all event slugs
awk '$0="/company/events/"$0' routes.txt >> new_routes.txt
sort new_routes.txt > routes.txt
rm new_routes.txt
