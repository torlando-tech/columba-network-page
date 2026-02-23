/**
 * Shared constellation star catalog.
 *
 * Single source of truth consumed by both js/constellation.js (hero canvas)
 * and tools/star-editor.html (interactive editor).
 *
 * Each star: { ra, dec, mag, label }
 *   ra   – Right Ascension in degrees (h*15 + m*0.25)
 *   dec  – Declination in degrees
 *   mag  – Apparent magnitude
 *   label – Common name / Bayer designation
 *
 * Constellations: Columba, Canis Major, Lepus, Puppis, Caelum, Pyxis, Vela, Carina, Eridanus.
 */
var CONSTELLATION_DATA = [
    //     {
    //   name: 'Columba', primary: true, side: 1,
    //   stars: [
    //     { ra: 133.76, dec: -3.52, mag: 3.87, label: 'ε Col' },
    //     { ra: 135.87, dec: -2.12, mag: 2.64, label: 'α Col (Phact)' },
    //     { ra: 138.69, dec: -3.82, mag: 3.12, label: 'β Col (Wazn)' },
    //     { ra: 140.36, dec: -3.33, mag: 4.36, label: 'γ Col' },
    //     { ra: 146.49, dec: -1.49, mag: 3.85, label: 'δ Col' },
    //     { ra: 140.76, dec: -10.87, mag: 3.96, label: 'η Col' },
    //   ],
    //   lines: [[0,1],[1,2],[2,3],[2,4],[2,5]],
    // },
    {
      name: 'Canis Major', side: -1,
      stars: [
        { ra: 142.17, dec: 13.94, mag: 1.98, label: 'β CMa (Mirzam)' },
        { ra: 145.67, dec: 12.64, mag: 3.91, label: 'ν² CMa' },
        { ra: 147.79, dec: 15.18, mag: -1.46, label: 'α CMa (Sirius)' },
        { ra: 150.03, dec: 7.72, mag: 3.87, label: 'ο¹ CMa' },
        { ra: 150.05, dec: 19.86, mag: 4.08, label: 'θ CMa' },
        { ra: 150.53, dec: 14.85, mag: 4.37, label: 'ι CMa' },
        { ra: 151.16, dec: 2.93, mag: 1.50, label: 'ε CMa (Adhara)' },
        { ra: 152.44, dec: 16.27, mag: 4.12, label: 'γ CMa (Muliphein)' },
        { ra: 153.60, dec: 5.51, mag: 1.84, label: 'δ CMa (Wezen)' },
        { ra: 157.52, dec: 2.60, mag: 2.45, label: 'η CMa (Aludra)' },
      ],
      lines: [[0,1],[0,2],[1,3],[2,5],[2,8],[3,6],[4,5],[4,7],[5,7],[6,8],[8,9]],
    },
    {
      name: 'Lepus', side: 1,
      stars: [
        { ra: 110.55, dec: 9.15, mag: 3.18, label: 'ε Lep' },
        { ra: 112.41, dec: 15.31, mag: 3.29, label: 'μ Lep' },
        { ra: 112.49, dec: 18.58, mag: 4.44, label: 'κ Lep' },
        { ra: 114.07, dec: 18.34, mag: 4.29, label: 'λ Lep' },
        { ra: 116.24, dec: 10.76, mag: 2.84, label: 'β Lep (Nihal)' },
        { ra: 117.36, dec: 13.70, mag: 2.57, label: 'α Lep (Arneb)' },
        { ra: 120.30, dec: 9.07, mag: 3.60, label: 'γ Lep' },
        { ra: 120.92, dec: 16.70, mag: 3.53, label: 'ζ Lep' },
        { ra: 122.01, dec: 10.64, mag: 3.85, label: 'δ Lep' },
        { ra: 123.28, dec: 17.35, mag: 3.72, label: 'η Lep' },
        { ra: 125.72, dec: 16.58, mag: 4.66, label: 'θ Lep' },
      ],
      lines: [[0,1],[0,4],[1,2],[1,3],[1,5],[4,5],[4,6],[5,7],[6,8],[7,9],[8,10],[9,10]],
    },
    {
      name: 'Puppis', side: -1,
      stars: [
        { ra: 148.25, dec: -25.42, mag: 5.04, label: 'HD 46273' },
        { ra: 149.00, dec: -11.81, mag: 3.17, label: 'ν Pup' },
        { ra: 158.53, dec: -4.47, mag: 2.70, label: 'π Pup (Ahadi)' },
        { ra: 163.46, dec: 3.47, mag: 4.63, label: 'c Pup' },
        { ra: 164.32, dec: 5.04, mag: 2.47, label: 'κ Pup' },
        { ra: 165.56, dec: 2.88, mag: 3.93, label: '3 Pup' },
        { ra: 166.93, dec: 6.98, mag: 3.30, label: 'ξ Pup' },
        { ra: 170.51, dec: -8.16, mag: 2.25, label: 'ζ Pup (Naos)' },
        { ra: 171.50, dec: 7.54, mag: 2.81, label: 'ρ Pup (Tureis)' },
        { ra: 172.30, dec: -15.86, mag: 1.83, label: 'γ² Vel (Regor)' },
      ],
      lines: [[7,8],[8,6],[6,4],[4,3],[3,2],[2,1],[1,0],[3,5],[5,6],[7,9]],
    },
    // {
    //   name: 'Caelum', side: 1,
    //   stars: [
    //     { ra: 70.15, dec: -41.86, mag: 4.45, label: 'α Cae' },
    //     { ra: 70.50, dec: -37.14, mag: 5.05, label: 'β Cae' },
    //     { ra: 76.00, dec: -35.48, mag: 4.55, label: 'γ Cae' },
    //   ],
    //   lines: [[0,1],[1,2]],
    // },
    {
      name: 'Pyxis', side: -1,
      stars: [
        { ra: 178.78, dec: -0.73, mag: 3.68, label: 'α Pyx' },
        { ra: 177.91, dec: -2.85, mag: 3.97, label: 'β Pyx' },
        { ra: 180.43, dec: 4.75, mag: 4.01, label: 'γ Pyx' },
      ],
      lines: [[0,1],[1,2]],
    },
    {
      name: 'Vela', side: -1,
      stars: [
        { ra: 172.28, dec: -15.77, mag: 1.83, label: 'γ² Vel (Regor)' },
        { ra: 182.02, dec: -23.80, mag: 3.54, label: 'ο Vel' },
        { ra: 190.53, dec: -23.88, mag: 1.96, label: 'δ Vel (Alsephina)' },
        { ra: 198.10, dec: -23.71, mag: 2.50, label: 'κ Vel (Markeb)' },
        { ra: 211.06, dec: -19.33, mag: 3.54, label: 'φ Vel' },
        { ra: 205.67, dec: -8.16, mag: 2.69, label: 'μ Vel' },
        { ra: 193.28, dec: -4.43, mag: 3.60, label: 'ψ Vel' },
        { ra: 186.84, dec: -8.32, mag: 2.21, label: 'λ Vel (Suhail)' },
      ],
      lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,0]],
    },
    {
      name: 'Carina', side: -1,
      stars: [
        { ra: 148.65, dec: -25.54, mag: -0.74, label: 'α Car (Canopus)' },
        { ra: 170.49, dec: -20.12, mag: 3.47, label: 'χ Car' },
        { ra: 177.14, dec: -29.08, mag: 1.86, label: 'ε Car (Avior)' },
        { ra: 188.74, dec: -29.87, mag: 2.21, label: 'ι Car (Aspidiske)' },
        { ra: 199.43, dec: -36.08, mag: 3.35, label: 'q Car' },
        { ra: 201.14, dec: -42.13, mag: 2.76, label: 'θ Car' },
        { ra: 192.78, dec: -47.24, mag: 3.32, label: 'ω Car' },
        { ra: 184.96, dec: -44.41, mag: 1.69, label: 'β Car (Miaplacidus)' },
        { ra: 201.59, dec: -37.49, mag: 3.27, label: 'p Car' },
        { ra: 207.88, dec: -36.08, mag: 3.79, label: 'u Car' },
        { ra: 206.71, dec: -41.66, mag: 4.61, label: 'z Car' },
        { ra: 209.59, dec: -40.01, mag: 4.62, label: 'y Car' },
        { ra: 210.49, dec: -37.49, mag: 3.83, label: 'V382 Car' },
      ],
      lines: [[0,7],[7,6],[6,5],[5,8],[8,4],[4,3],[3,2],[2,1],[8,9],[5,10],[10,11],[11,12],[12,9]],
    },
    {
      name: 'Eridanus', side: 1,
      stars: [
        { ra: 111.57, dec: 22.91, mag: 2.79, label: 'β Eri (Cursa)' },
        { ra: 105.99, dec: 24.75, mag: 4.00, label: 'μ Eri' },
        { ra: 103.69, dec: 24.65, mag: 3.93, label: 'ν Eri' },
        { ra: 97.58, dec: 21.16, mag: 4.03, label: 'ο¹ Eri (Beid)' },
        { ra: 94.12, dec: 14.49, mag: 2.94, label: 'γ Eri (Zaurak)' },
        { ra: 91.15, dec: 15.90, mag: 4.42, label: 'π Eri' },
        { ra: 90.42, dec: 18.24, mag: 3.54, label: 'δ Eri (Rana)' },
        { ra: 87.84, dec: 18.54, mag: 3.73, label: 'ε Eri (Ran)' },
        { ra: 78.72, dec: 19.10, mag: 3.87, label: 'η Eri (Azha)' },
        { ra: 75.64, dec: 14.14, mag: 4.24, label: 'π Cet' },
        { ra: 75.89, dec: 9.43, mag: 4.46, label: 'τ¹ Eri' },
        { ra: 80.21, dec: 4.38, mag: 4.09, label: 'τ³ Eri' },
        { ra: 84.49, dec: 6.24, mag: 3.70, label: 'τ⁴ Eri' },
        { ra: 88.06, dec: 6.37, mag: 4.25, label: 'τ⁵ Eri' },
        { ra: 91.32, dec: 4.75, mag: 4.20, label: 'τ⁶ Eri' },
        { ra: 93.04, dec: 3.39, mag: 4.62, label: 'τ⁸ Eri' },
        { ra: 94.59, dec: 3.98, mag: 4.66, label: 'τ⁹ Eri' },
        { ra: 102.99, dec: -1.77, mag: 4.51, label: 'υ¹ Eri' },
        { ra: 103.50, dec: -2.56, mag: 3.82, label: 'υ² Eri' },
        { ra: 100.62, dec: -6.02, mag: 3.96, label: '43 Eri' },
        { ra: 99.08, dec: -5.80, mag: 3.56, label: 'υ⁴ Eri' },
        { ra: 91.97, dec: -8.20, mag: 4.17, label: 'g Eri' },
        { ra: 88.88, dec: -12.27, mag: 4.58, label: 'y Eri' },
        { ra: 84.59, dec: -15.07, mag: 4.27, label: 'e Eri' },
        { ra: 79.18, dec: -12.30, mag: 2.88, label: 'θ Eri (Acamar)' },
        { ra: 74.78, dec: -11.86, mag: 4.12, label: 'ι Eri' },
        { ra: 74.56, dec: -14.89, mag: 4.75, label: 's Eri' },
        { ra: 71.36, dec: -19.70, mag: 4.25, label: 'κ Eri' },
        { ra: 63.60, dec: -23.61, mag: 3.71, label: 'χ Eri' },
        { ra: 59.04, dec: -29.24, mag: 0.46, label: 'α Eri (Achernar)' },
      ],
      lines: [[0,1],[1,2],[2,3],[3,4],[4,5],[5,6],[6,7],[7,8],[8,9],[9,10],[10,11],[11,12],[12,13],[13,14],[14,15],[15,16],[16,17],[17,18],[18,19],[19,20],[20,21],[21,22],[22,23],[23,24],[24,25],[25,26],[26,27],[27,28],[28,29]],
    },
];
