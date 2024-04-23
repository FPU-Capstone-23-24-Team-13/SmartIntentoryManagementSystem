# SmartIntentoryManagementSystem
Pages and scripts used to set up NGinx-hosted web application.
To set up application:
1) Place the web files (pages, styles, scripts, images) in a desired path on machine, for us that is /var/lrh_store/nginx/html/
2) Place the nginx config file in a folder along a similar path /var/lrh_store/nginx/conf.d/
3) Make sure that this path is specified in your docker compose file under nginx section
4) Run docker compose -f "your_file_name.yaml" up -d
5) Visit localhost to see application
