In order to run the aplication locally, one must use the command docker pull for each of the three images, create a network, and run the three containers, with the caveat that both MySQL and Django must be in the same network and for each container must define the port (where MySQL is expected to be 3307:3306, Django 8000:8000 and Angular 4201:4200). Finally, the MySQL one must be called “django__db_1”, in order to match the settings of the Django container. All the commands used are listed bellow.

The files regarding the settings of the Django app are inserted into /my-app-dir/crmapp/settings.py within the container itself.

Commands used to successufully build the application:

sudo docker pull pedrodmmoreira/vfp_webserver:mysql-httpd

sudo docker pull pedrodmmoreira/vfp_webserver:django-httpd

sudo docker pull pedrodmmoreira/vfp_webserver:angular-httpd

sudo docker network create VFP_NETWORK

sudo docker run --rm --name django__db_1 --network VFP_NETWORK -p 3307:3306 pedrodmmoreira/vfp_webserver:mysql-httpd

sudo docker run --rm --name django__web_1 --network VFP_NETWORK -p 8000:8000 pedrodmmoreira/vfp_webserver:django-httpd

sudo docker run --rm --name angular_vfp -p 4201:4200 pedrodmmoreira/vfp_webserver:angular-httpd