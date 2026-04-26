export const EXTRAS = {
  ELECTIVA_HUMANISTICA: 'Electiva Humanística',
  ELECTIVA_TECNICA: 'Electiva Técnica'
}

export const specialtiesList = [
  'Potencia',
  'Electrónica y Control',
  'Comunicaciones',
  'Industrial'
];

export const pensum = [
  // Semestre 1
  { code: '0331', name: 'Física General I', uc: 5, semester: 1, reqs: [], reqCr: 0, common: true },
  { code: '0251', name: 'Cálculo I', uc: 5, semester: 1, reqs: [], reqCr: 0, common: true },
  { code: '0012', name: 'Introducción a la Ingeniería', uc: 2, semester: 1, reqs: [], reqCr: 0, common: true },
  { code: '0183', name: 'Lengua y Comunicación', uc: 2, semester: 1, reqs: [], reqCr: 0, common: true },
  { code: '0551', name: 'Geometría Descriptiva I', uc: 5, semester: 1, reqs: [], reqCr: 0, common: true },

  // Semestre 2
  { code: '0250', name: 'Algebra Lineal y Geometría', uc: 4, semester: 2, reqs: ['0251'], reqCr: 0, common: true },
  { code: '0252', name: 'Cálculo II', uc: 5, semester: 2, reqs: ['0251'], reqCr: 0, common: true },
  { code: '0332', name: 'Física General II', uc: 5, semester: 2, reqs: ['0331', '0251'], reqCr: 0, common: true },
  { code: '0441', name: 'Química General I', uc: 5, semester: 2, reqs: [], reqCr: 0, common: true },
  { code: '0334', name: 'Laboratorio de Física I', uc: 1, semester: 2, reqs: ['0331'], reqCr: 0, common: true },

  // Semestre 3
  { code: '0253', name: 'Cálculo III', uc: 5, semester: 3, reqs: ['0252'], reqCr: 0, common: true },
  { code: '0255', name: 'Ecuaciones Diferenciales Ordinarias', uc: 5, semester: 3, reqs: ['0252', '0250'], reqCr: 0, common: true },
  { code: '0790', name: 'Programación', uc: 4, semester: 3, reqs: ['0250'], reqCr: 0, common: true },
  { code: '0602', name: 'Mecánica Aplicada', uc: 4, semester: 3, reqs: ['0331', '0252'], reqCr: 0, common: true },
  { code: 'ELH1', name: 'Electiva Humanística I', uc: 2, semester: 3, reqs: [], reqCr: 0, common: true },

  // Semestre 4
  { code: '0333', name: 'Tópicos de Física General', uc: 4, semester: 4, reqs: ['0251', '0331'], reqCr: 0, common: true },
  { code: '2107', name: 'Redes Eléctricas I', uc: 5, semester: 4, reqs: ['0253', '0332', '0255'], reqCr: 0, common: true },
  { code: '2515', name: 'Variable Compleja y Calc. Oper.', uc: 4, semester: 4, reqs: ['0255', '0253'], reqCr: 0, common: true },
  { code: '0254', name: 'Cálculo Vectorial', uc: 2, semester: 4, reqs: ['0253', '0250'], reqCr: 0, common: true },
  { code: '0185', name: 'Redacción de Informes', uc: 3, semester: 4, reqs: ['0183'], reqCr: 50, common: true },
  { code: 'ELH2', name: 'Electiva Humanística II', uc: 2, semester: 4, reqs: [], reqCr: 0, common: true },

  // Semestre 5
  { code: '2514', name: 'Calculo Numérico', uc: 4, semester: 5, reqs: ['0255', '0790'], reqCr: 0, common: true },
  { code: '2108', name: 'Redes Eléctricas II', uc: 4, semester: 5, reqs: ['2107', '0790', '2515'], reqCr: 0, common: true },
  { code: '2112', name: 'Laboratorio de Ing. Eléctrica I', uc: 2, semester: 5, reqs: ['2107'], reqCr: 0, common: true },
  { code: '2216', name: 'Electrónica I', uc: 5, semester: 5, reqs: ['2107'], reqCr: 0, common: true },
  { code: '2507', name: 'Análisis de Sistemas Lineales', uc: 4, semester: 5, reqs: ['2107', '2515', '0790'], reqCr: 0, common: true },
  { code: '2508', name: 'Probabilidades', uc: 3, semester: 5, reqs: ['2515'], reqCr: 0, common: true },

  // Semestre 6
  { code: '2233', name: 'Lógica Digital', uc: 3, semester: 6, reqs: ['2107'], reqCr: 0, common: true },
  { code: '2124', name: 'Teoría Electromagnética', uc: 4, semester: 6, reqs: ['0333', '2107', '0254'], reqCr: 0, common: true },
  { code: '2109', name: 'Redes Eléctricas III', uc: 4, semester: 6, reqs: ['2108', '2507'], reqCr: 0, common: true },
  { code: '2113', name: 'Laboratorio de Ing. Eléctrica II', uc: 1, semester: 6, reqs: ['2112', '2108'], reqCr: 0, common: true },
  { code: '2217', name: 'Electrónica II', uc: 5, semester: 6, reqs: ['2216', '2507', '2112'], reqCr: 0, common: true },
  { code: '2415', name: 'Sistemas de Telecomunicaciones I', uc: 3, semester: 6, reqs: ['2508', '2507'], reqCr: 0, common: true },

  // Semestre 7
  { code: '2222', name: 'Sistemas de Control I', uc: 5, semester: 7, reqs: ['2217', '2507'], reqCr: 0, common: true },
  { code: '2345', name: 'Sistemas de Potencia I', uc: 3, semester: 7, reqs: ['2109'], reqCr: 0, common: true },
  { code: '2426', name: 'Comunicaciones I', uc: 5, semester: 7, reqs: ['2415', '2109'], reqCr: 0, common: true },
  { code: '2132', name: 'Conversión de Energía', uc: 3, semester: 7, reqs: ['2124', '0441', '0602'], reqCr: 0, common: true },
  { code: '2234', name: 'Sistemas Digitales I', uc: 4, semester: 7, reqs: ['2217', '2233'], reqCr: 0, common: true },

  // ======= Especialidades ======= //
  // ============================== //
  
  // Electrónica y Control
  { code: '2218', name: 'Electrónica III', uc: 4, reqs: ['2217'], reqCr: 0, specialties: { 'Electrónica y Control': 8 } },
  { code: '2282', name: 'Laboratorio de Proyectos', uc: 2, reqs: ['2222'], reqCr: 130, specialties: { 'Electrónica y Control': 8 } },
  { code: '2265', name: 'Microprocesadores I', uc: 4, reqs: ['2234'], reqCr: 0, specialties: { 'Electrónica y Control': 8, 'Industrial': 8 } },
  { code: '2133', name: 'Conversión Electromecánica de Energía', uc: 6, reqs: ['2108', '2113', '2124'], reqCr: 0, specialties: { 'Electrónica y Control': 8 } },
  { code: '2223', name: 'Sistema de Control II', uc: 4, reqs: ['2222'], reqCr: 0, specialties: { 'Electrónica y Control': 8 } },
  
  { code: 'ELE_E1', name: 'Electiva Técnica 1 (Elec)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Electrónica y Control': 9 } },
  { code: '2283', name: 'Trabajo de Grado I', uc: 4, reqs: [], reqCr: 150, specialties: { 'Electrónica y Control': 9, 'Potencia': 9, 'Comunicaciones': 9, 'Industrial': 9 } },
  { code: '2244', name: 'Diseño de Equipo Electrónico', uc: 4, reqs: ['2218'], reqCr: 0, specialties: { 'Electrónica y Control': 9 } },
  { code: '2266', name: 'Instrumentación y Control Industrial', uc: 4, reqs: ['2222'], reqCr: 0, specialties: { 'Electrónica y Control': 9, 'Industrial': 8 } },
  { code: '2520', name: 'Ejercicio Prof y Gerencia', uc: 4, reqs: [], reqCr: 130, specialties: { 'Electrónica y Control': 9, 'Potencia': 8, 'Comunicaciones': 9, 'Industrial': 8 } },
  
  { code: 'ELE_E2', name: 'Electiva Técnica 2 (Elec)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Electrónica y Control': 10 } },
  { code: 'ELE_E3', name: 'Electiva Técnica 3 (Elec)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Electrónica y Control': 10 } },
  { code: '2284', name: 'Trabajo de Grado II', uc: 9, reqs: ['2283'], reqCr: 0, specialties: { 'Electrónica y Control': 10 } },
  { code: '2523', name: 'Ingeniería Económica', uc: 4, reqs: ['2520'], reqCr: 0, specialties: { 'Electrónica y Control': 10, 'Potencia': 10, 'Comunicaciones': 10, 'Industrial': 10 } },

  // Potencia
  { code: '2315', name: 'Máquinas Eléctricas I', uc: 6, reqs: ['2109', '2124', '2112'], reqCr: 0, specialties: { 'Potencia': 8, 'Industrial': 8 } },
  { code: '2346', name: 'Sistemas de Potencia II', uc: 4, reqs: ['2345'], reqCr: 0, specialties: { 'Potencia': 8 } },
  { code: '2349', name: 'Plantas y Subestaciones', uc: 4, reqs: ['2345'], reqCr: 0, specialties: { 'Potencia': 8 } },
  { code: '2351', name: 'Sistemas Trans. Y Distribución', uc: 4, reqs: ['2345'], reqCr: 0, specialties: { 'Potencia': 8 } },
  
  { code: '2360', name: 'Sobretensiones Transitorias', uc: 4, reqs: ['2346'], reqCr: 0, specialties: { 'Potencia': 9 } },
  { code: '2316', name: 'Máquinas Eléctricas II', uc: 5, reqs: ['2315'], reqCr: 0, specialties: { 'Potencia': 9, 'Industrial': 9 } },
  { code: '2317', name: 'Lab de Máquinas Eléctricas', uc: 2, reqs: ['2315'], reqCr: 0, specialties: { 'Potencia': 9, 'Industrial': 9 } },
  { code: '2348', name: 'Sistemas de Protección I', uc: 4, reqs: ['2346'], reqCr: 0, specialties: { 'Potencia': 9 } },
  
  { code: 'ELE_P1', name: 'Electiva Técnica 1 (Pot)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Potencia': 10 } },
  { code: '2347', name: 'Sistemas de Potencia III', uc: 4, reqs: ['2346', '2316'], reqCr: 0, specialties: { 'Potencia': 10 } },
  { code: '2384', name: 'Trabajo de Grado II', uc: 9, reqs: ['2283'], reqCr: 0, specialties: { 'Potencia': 10 } },

  // Comunicaciones
  { code: '2427', name: 'Comunicaciones II', uc: 4, reqs: ['2426'], reqCr: 0, specialties: { 'Comunicaciones': 8 } },
  { code: '2440', name: 'Ondas Guiadas', uc: 4, reqs: ['2426', '2124'], reqCr: 0, specialties: { 'Comunicaciones': 8 } },
  { code: '2441', name: 'Propagación y Antenas', uc: 5, reqs: ['2426', '2124'], reqCr: 0, specialties: { 'Comunicaciones': 8 } },
  { code: '2428', name: 'Lab. de Comunicaciones I', uc: 2, reqs: ['2426', '2216'], reqCr: 0, specialties: { 'Comunicaciones': 8 } },
  { code: '2416', name: 'Sistema de Telecom. II', uc: 4, reqs: ['2426'], reqCr: 0, specialties: { 'Comunicaciones': 8 } },

  { code: 'ELE_C1', name: 'Electiva Técnica 1 (Com)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Comunicaciones': 9 } },
  { code: '2417', name: 'Sistema de Telecom. III', uc: 4, reqs: ['2416', '2441'], reqCr: 0, specialties: { 'Comunicaciones': 9 } },
  { code: '2429', name: 'Lab. de Comunicaciones II', uc: 2, reqs: ['2428', '2440'], reqCr: 0, specialties: { 'Comunicaciones': 9 } },

  { code: 'ELE_C2', name: 'Electiva Técnica 2 (Com)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Comunicaciones': 10 } },
  { code: 'ELE_C3', name: 'Electiva Técnica 3 (Com)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Comunicaciones': 10 } },
  { code: '2484', name: 'Trabajo de Grado II', uc: 9, reqs: ['2283'], reqCr: 0, specialties: { 'Comunicaciones': 10 } },

  // Industrial
  { code: '2335', name: 'Canalizaciones y Distribución', uc: 4, reqs: ['2345'], reqCr: 0, specialties: { 'Industrial': 8 } },
  
  { code: '2219', name: 'Electrónica de Potencia I', uc: 4, reqs: ['2217', '2133'], reqCr: 0, specialties: { 'Industrial': 9 } },
  { code: 'ELE_I1', name: 'Electiva Técnica 1 (Ind)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Industrial': 9 } },
  
  { code: 'ELE_I2', name: 'Electiva Técnica 2 (Ind)', uc: 4, reqs: [], reqCr: 150, specialties: { 'Industrial': 10 } },
  { code: '2318', name: 'Accionamiento y Contr. Mot. Elect.', uc: 5, reqs: ['2316', '2317'], reqCr: 0, specialties: { 'Industrial': 10 } },
  { code: '2584', name: 'Trabajo de Grado II', uc: 9, reqs: ['2283'], reqCr: 0, specialties: { 'Industrial': 10 } }
];
