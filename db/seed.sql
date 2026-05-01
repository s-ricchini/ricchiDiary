INSERT INTO categories (id, name, color) VALUES 
    (UUID_TO_BIN('90779e0f-062c-492e-89aa-46e126fbfce9'), 'cocina',   '#ffbb00'),
    (UUID_TO_BIN('56db551c-a0a3-485d-8c5d-f8b36b5c9fd4'), 'deportes', '#23d9c4'),
    (UUID_TO_BIN('47b9ba83-61fa-4ea0-81dc-b70c564906a2'), 'facultad', '#d94d23');


INSERT INTO diaries (id, title, category) VALUES
    (UUID_TO_BIN(UUID()), 'Receta de pasta carbonara',        UUID_TO_BIN('90779e0f-062c-492e-89aa-46e126fbfce9')),
    (UUID_TO_BIN(UUID()), 'Postres fáciles para el finde',    UUID_TO_BIN('90779e0f-062c-492e-89aa-46e126fbfce9')),
    (UUID_TO_BIN(UUID()), 'Mis salsas favoritas',             UUID_TO_BIN('90779e0f-062c-492e-89aa-46e126fbfce9')),
    (UUID_TO_BIN('71921642-c72b-4f3b-b60f-c61964c184c7'), 'Receta milanesas',    UUID_TO_BIN('90779e0f-062c-492e-89aa-46e126fbfce9')),
    (UUID_TO_BIN(UUID()), 'Rutina de entrenamiento semanal',  UUID_TO_BIN('56db551c-a0a3-485d-8c5d-f8b36b5c9fd4')),
    (UUID_TO_BIN(UUID()), 'Progreso en el gimnasio',          UUID_TO_BIN('56db551c-a0a3-485d-8c5d-f8b36b5c9fd4')),
    (UUID_TO_BIN(UUID()), 'Partidos del mes',                 UUID_TO_BIN('56db551c-a0a3-485d-8c5d-f8b36b5c9fd4')),

    (UUID_TO_BIN(UUID()), 'Apuntes de Algoritmos',            UUID_TO_BIN('47b9ba83-61fa-4ea0-81dc-b70c564906a2')),
    (UUID_TO_BIN(UUID()), 'Resumen para el parcial',          UUID_TO_BIN('47b9ba83-61fa-4ea0-81dc-b70c564906a2')),
    (UUID_TO_BIN(UUID()),"libros de ajedrez",null);
    (UUID_TO_BIN(UUID()), 'Trabajos prácticos pendientes',    UUID_TO_BIN('47b9ba83-61fa-4ea0-81dc-b70c564906a2')),
    (UUID_TO_BIN('d807c3ec-4ea4-411b-b72c-0052ad5539f4'), 'Apuntes parciales algebra',    UUID_TO_BIN('47b9ba83-61fa-4ea0-81dc-b70c564906a2'));


INSERT INTO entries (id, parent_id, title, content) VALUES
    (UUID_TO_BIN(UUID()), UUID_TO_BIN('71921642-c72b-4f3b-b60f-c61964c184c7'), 'Ingredientes', 'Carne picada, pan rallado, huevo, sal, pimienta, ajo y perejil al gusto.'),
    (UUID_TO_BIN(UUID()), UUID_TO_BIN('71921642-c72b-4f3b-b60f-c61964c184c7'), 'Preparación', 'Mezclar todos los ingredientes, formar las milanesas y pasar por pan rallado. Freír en aceite caliente 3 minutos por lado.'),
    (UUID_TO_BIN(UUID()), UUID_TO_BIN('71921642-c72b-4f3b-b60f-c61964c184c7'), 'Tips', 'Para que queden más jugosas, dejarlas reposar 10 minutos antes de freír.'),

    (UUID_TO_BIN(UUID()), UUID_TO_BIN('d807c3ec-4ea4-411b-b72c-0052ad5539f4'), 'Unidad 1 - Vectores', 'Un vector en R^n es una tupla ordenada de n números reales. Operaciones: suma, resta y producto escalar.'),
    (UUID_TO_BIN(UUID()), UUID_TO_BIN('d807c3ec-4ea4-411b-b72c-0052ad5539f4'), 'Unidad 2 - Matrices', 'Una matriz es un arreglo rectangular de números. La multiplicación de matrices no es conmutativa.'),
    (UUID_TO_BIN(UUID()), UUID_TO_BIN('d807c3ec-4ea4-411b-b72c-0052ad5539f4'), 'Unidad 3 - Determinantes', 'El determinante de una matriz cuadrada indica si la matriz es invertible. Si det(A) = 0, la matriz es singular.');