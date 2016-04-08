cliente   servidor

http - json xml txt csv

rest ---> RESTfull
-wsdl +doc +convenio

   sql                     rest
   tabla                   recurso
   verbos                  nombres                            respuestas    body
R: select GET              /facturas []   /facturas/:id {}    200 204 404   [] {}
 
C: insert POST             /facturas {}                       201 4**       id {}

U: update PUT / POST       /facturas/:id                      200 4**       {}

D: delete DELETE / POST    /facturas/:id                      200 204 4**

-árbol de recursos
    /clientes
        /:alberto
            /facturas
                /articulos
            /envios
            /pedidos
        /:pepe
            /facturas
                /2569
                    /articulos
                        
                    /pagos
    /pais/:francia/clientes
    /pais/:francia/facturas/:2578
    /clientes/

    planetas/
        tierra
           /europa
                /españa
                /francia
           /america
                /mexico
                /argentina
        españa
            /galicia
            /andalucia
            /castilla
    
-parámetros GET:http://miempresa.com/facturas?fini=20160401&ffin20160501

-esquemas
 1- Entidad-Relación

    2- Relacional o Documental
       Tablas (claves foráneas) o Colecciones
            
            3- Recursos API
       
       
 POST: /emails  {seder:sdfgs, subject:sdfasdf}
 
 POST: /facturaciones {mes:abril, clientes: vip, informe:falso}
 
 POST: /facturas { fecha:06042015 , cliente:apple, productos:[{cant:100000, desc:pantalla, pvp:159, componentes:['cristal','marco','herramienta']},{}] }
        
