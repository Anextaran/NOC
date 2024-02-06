Dependencies: 
-cron: Libreria de tiempo, ideal
para el NOC el cual realizara acciones
cada cierto tiempo.
-dotenv: Acceder a variables de entorno
-env-var: Validaciones de variables de entorno


#dev
1. Clonar el archivo .env.template a .env
2. Configurar variables de entorno


#env

*PORT              = port
--(using the email-key below we're gonna send the emails with the logs)--
*MAILER_EMAIL      = email origin
*MAILER_SECRET_KEY = email origin key

--(which service, e.g 'gmail')
*MAILER_SERVICE    =