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
 * Constellations: Columba, Canis Major, Lepus, Puppis, Caelum, Pyxis, Vela, Carina.
 */
var CONSTELLATION_DATA = [
    {
      name: 'Columba', primary: true, side: 1,
      stars: [
        { ra: 114.44, dec: -0.75, mag: 3.87, label: 'ε Col' },
        { ra: 116.55, dec: 0.65, mag: 2.64, label: 'α Col (Phact)' },
        { ra: 119.37, dec: -1.05, mag: 3.12, label: 'β Col (Wazn)' },
        { ra: 121.04, dec: -0.56, mag: 4.36, label: 'γ Col' },
        { ra: 127.17, dec: 1.28, mag: 3.85, label: 'δ Col' },
        { ra: 121.44, dec: -8.10, mag: 3.96, label: 'η Col' },
      ],
      lines: [[0,1],[1,2],[2,3],[2,4],[2,5]],
    },
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
        { ra: 78.23, dec: -16.21, mag: 3.31, label: 'μ Lep' },
        { ra: 83.18, dec: -17.82, mag: 2.58, label: 'α Lep (Arneb)' },
        { ra: 86.73, dec: -14.82, mag: 3.55, label: 'ζ Lep' },
        { ra: 89.10, dec: -14.17, mag: 3.72, label: 'η Lep' },
        { ra: 82.05, dec: -20.76, mag: 2.84, label: 'β Lep (Nihal)' },
        { ra: 76.35, dec: -22.37, mag: 3.19, label: 'ε Lep' },
        { ra: 86.13, dec: -22.45, mag: 3.60, label: 'γ Lep' },
        { ra: 87.80, dec: -20.88, mag: 3.81, label: 'δ Lep' },
      ],
      lines: [[0,1],[0,5],[1,4],[4,5],[1,2],[2,3],[2,7],[7,6],[6,4]],
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
    {
      name: 'Caelum', side: 1,
      stars: [
        { ra: 70.15, dec: -41.86, mag: 4.45, label: 'α Cae' },
        { ra: 70.50, dec: -37.14, mag: 5.05, label: 'β Cae' },
        { ra: 76.00, dec: -35.48, mag: 4.55, label: 'γ Cae' },
      ],
      lines: [[0,1],[1,2]],
    },
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
];
