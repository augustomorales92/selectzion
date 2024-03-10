// This file contains placeholder data that you'll be replacing with real data in the Data Fetching chapter:
// https://nextjs.org/learn/dashboard-app/fetching-data
const users = [
  {
    id: '410544b2-4001-4271-9855-fec4b6a6442a',
    name: 'User',
    email: 'user@nextmail.com',
    password: '123456',
  },
];

const products = [
  {
    name: 'Specialized Epic Expert',
    description: `
    -Talle L
    -Ruedas roval control carbon
    -Rock shox sid brain
    -Sram Gx 12 vel ( 10 - 50 )
    -Cuadro carbono `,
    amount: 3000,
    status: 'pending'
  },
  {
    name: 'Specialized epic comp carbon ht 2019',
    description: `
    -Talle S
-Carbono
-Transmision Sram NX 12 velocidades
-Frenos shimano Deore
-Rock Shox Reba
-Ruedas Roval Aluminio
-Cadena y Pastillas Nuevas
-*Se vende sin pedales
`,
    amount: 5000,
    status: 'pending'
  },
  {
    name: 'Specialized Epic HT - M',
    description: `
    -TALLE M
-Cuadro carbono
-Suspensión Sid World Cup (Cristo y poste de carbono) Bloqueo Remoto - precio con sid brain 2019
-Transmisión Sram XO Eagle 12 Velocidades
-Ruedas DT Swiss X1825
-Frenos Sram Level TLM
-Manubrio (carbono) y Stem Ritchey Originales
-Caño de Asiento Carbono P Silleta Syncros XR 1.5
`,
    amount: 8000,
    status: 'sold'
  },
];

module.exports = {
  users,
  products,
};
