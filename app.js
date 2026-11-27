(() => {
    'use strict';
    function getElement(id) {
        return document.getElementById(id);
    }
    const DATA_KEY = 'carspotter.data.v2';
    const LEGACY_KEYS = ['carspotter.prototype.v1', 'carspotter.data.v1'];
    const THEME_KEY = 'carspotter.theme.v2';
    const DB_NAME = 'carspotter-local';
    const DB_VERSION = 1;
    const STORE_NAME = 'app';
    const modelCatalog = {
        'Acura': ['Integra', 'TLX', 'ILX', 'NSX', 'MDX', 'RDX', 'RSX', 'TSX'],
        'Alfa Romeo': ['Giulia', 'Stelvio', '4C', '8C', 'Tonale'],
        'Aston Martin': ['Vantage', 'DB11', 'DB12', 'DBS', 'Vanquish', 'Valkyrie', 'DBX'],
        'Audi': ['A3', 'S3', 'RS 3', 'A4', 'S4', 'RS 4', 'A5', 'S5', 'RS 5', 'A6', 'S6', 'RS 6', 'A7', 'S7', 'RS 7', 'A8', 'Q3', 'Q5', 'SQ5', 'Q7', 'SQ7', 'Q8', 'RS Q8', 'R8', 'TT'],
        'Bentley': ['Continental GT', 'Flying Spur', 'Bentayga', 'Mulsanne', 'Bacalar', 'Batur'],
        'BMW': ['1 Series', '2 Series', 'M2', '3 Series', 'M3', '4 Series', 'M4', '5 Series', 'M5', '6 Series', '7 Series', '8 Series', 'M8', 'Z3', 'Z4', 'X1', 'X3', 'X3 M', 'X4', 'X4 M', 'X5', 'X5 M', 'X6', 'X6 M', 'X7', 'XM', 'i4', 'i5', 'i7', 'i8'],
        'Bugatti': ['Chiron', 'Veyron', 'Divo', 'Bolide', 'Tourbillon', 'EB110'],
        'Buick': ['Regal', 'Grand National', 'GNX', 'Enclave'],
        'Cadillac': ['ATS-V', 'CT4', 'CT4-V Blackwing', 'CT5', 'CT5-V Blackwing', 'CTS-V', 'Celestiq', 'Escalade'],
        'Chevrolet': ['Corvette', 'Camaro', 'Chevelle', 'Impala', 'SS', 'Monte Carlo', 'El Camino', 'Silverado', 'Blazer', 'Tahoe'],
        'Chrysler': ['300', 'Crossfire', 'Prowler'],
        'Dodge': ['Challenger', 'Charger', 'Viper', 'Durango', 'Neon SRT-4', 'Ram SRT-10'],
        'Ferrari': ['296 GTB', '296 GTS', 'F8 Tributo', 'SF90 Stradale', 'SF90 Spider', '812 Superfast', '812 Competizione', '12Cilindri', 'Roma', 'Portofino', '488 GTB', '458 Italia', '430 Scuderia', 'F40', 'F50', 'Enzo', 'LaFerrari', 'Daytona SP3'],
        'Fiat': ['500', '124 Spider', 'X1/9'],
        'Ford': ['Mustang', 'GT', 'Focus RS', 'Focus ST', 'Fiesta ST', 'Bronco', 'Bronco Raptor', 'F-150', 'F-150 Raptor', 'Ranger', 'Taurus SHO', 'Crown Victoria', 'Escort RS Cosworth'],
        'Genesis': ['G70', 'G80', 'G90', 'GV60', 'GV70', 'GV80'],
        'GMC': ['Sierra', 'Yukon', 'Typhoon', 'Syclone', 'Hummer EV'],
        'Honda': ['Civic', 'Civic Type R', 'Integra', 'S2000', 'NSX', 'Accord', 'Prelude', 'CR-X', 'Fit'],
        'Hyundai': ['Elantra N', 'Veloster N', 'Kona N', 'Sonata N Line', 'Ioniq 5 N', 'Genesis Coupe'],
        'Hennessey': ['Venom F5', 'Venom GT', 'Exorcist'],
        'Koenigsegg': ['CCX', 'Agera', 'Jesko', 'Regera', 'Gemera', 'CC850', 'One:1'],
        'Infiniti': ['G35', 'G37', 'Q50', 'Q60', 'QX80'],
        'Jaguar': ['F-Type', 'F-Pace', 'XJ', 'XK', 'XE', 'E-Type'],
        'Jeep': ['Wrangler', 'Grand Cherokee', 'Grand Cherokee Trackhawk', 'Gladiator', 'Cherokee'],
        'Kia': ['Stinger', 'EV6 GT', 'K5 GT', 'Forte GT'],
        'Lamborghini': ['Huracán', 'Aventador', 'Revuelto', 'Urus', 'Gallardo', 'Murciélago', 'Diablo', 'Countach', 'Essenza SCV12', 'Centenario', 'Sian', 'Reventón'],
        'Land Rover': ['Defender', 'Range Rover Sport', 'Range Rover', 'Discovery'],
        'Lexus': ['RC F', 'LC 500', 'LFA', 'IS 500', 'IS F', 'GS F', 'NX', 'GX', 'LX', 'LQ'],
        'Lincoln': ['Continental', 'Navigator', 'Aviator'],
        'Lotus': ['Emira', 'Evora', 'Exige', 'Elise', 'Esprit', 'Evija', 'Eletre'],
        'Morgan': ['Plus Four', 'Plus Six', 'Super 3', 'Aero 8'],
        'Maserati': ['MC20', 'GranTurismo', 'Ghibli', 'Quattroporte', 'Grecale', 'MC12'],
        'Mazda': ['MX-5 Miata', 'RX-7', 'RX-8', 'Mazda3', 'Mazda6', 'Cosmo'],
        'McLaren': ['570S', '600LT', '620R', '720S', '750S', '765LT', 'Artura', 'P1', 'Senna', 'Speedtail', 'F1', 'GT', 'Solus GT'],
        'Mercedes-Benz': ['A-Class', 'C-Class', 'C 63 AMG', 'E-Class', 'E 63 AMG', 'S-Class', 'S 63 AMG', 'AMG GT', 'SL', 'G-Class', 'CLA', 'GLC', 'GLE', 'CLK', 'SLS AMG'],
        'Mini': ['Cooper', 'Cooper S', 'John Cooper Works', 'Countryman', 'Clubman'],
        'Mitsubishi': ['Lancer Evolution', '3000GT', 'Eclipse', 'Eclipse Cross', 'Galant VR-4'],
        'Nissan': ['GT-R', 'Z', '370Z', '350Z', 'Silvia', 'Skyline', '240SX', 'Maxima', 'Sentra Nismo', '180SX', 'Figaro'],
        'Pagani': ['Zonda', 'Huayra', 'Utopia', 'Imola'],
        'Polestar': ['1', '2', '3', '4'],
        'Rimac': ['Nevera', 'Concept_One'],
        'Saleen': ['S7', 'S281', 'S302'],
        'SSC': ['Ultimate Aero', 'Tuatara'],
        'Pontiac': ['GTO', 'Firebird', 'Trans Am', 'Solstice', 'Fiero', 'G8'],
        'Porsche': ['911', '718 Cayman', '718 Boxster', 'Cayenne', 'Macan', 'Panamera', 'Taycan', 'Carrera GT', '918 Spyder', '944', '928'],
        'Ram': ['1500 TRX', '1500', '2500'],
        'Rivian': ['R1T', 'R1S'],
        'Rolls-Royce': ['Ghost', 'Wraith', 'Dawn', 'Cullinan', 'Spectre', 'Phantom'],
        'Subaru': ['WRX', 'WRX STI', 'BRZ', 'Legacy GT', 'Forester XT', 'Impreza 22B'],
        'Tesla': ['Model S', 'Model 3', 'Model X', 'Model Y', 'Cybertruck', 'Roadster'],
        'Toyota': ['GR Supra', 'Supra', 'GR86', '86', 'GR Corolla', 'Corolla', 'Camry', 'MR2', 'Land Cruiser', 'Tacoma', '4Runner', 'Celica', 'Chaser', 'Crown'],
        'Volkswagen': ['Golf GTI', 'Golf R', 'Jetta GLI', 'Arteon', 'Tiguan', 'Scirocco', 'Corrado'],
        'Volvo': ['S60', 'S90', 'V60 Polestar', 'XC60', 'XC90'],
        'Other': ['Other / custom…']
    };
    const makes = Object.keys(modelCatalog).filter(x => x !== 'Other').sort((a, b) => a.localeCompare(b));
    const submodelCatalog = {
        'Acura': { 'Integra': ['Base', 'A-Spec', 'Type S'], 'TLX': ['Base', 'Technology', 'A-Spec', 'Advance', 'Type S'], 'NSX': ['Base', 'Type S'], 'RSX': ['Base', 'Type-S'], 'MDX': ['Base', 'Technology', 'A-Spec', 'Advance', 'Type S'] },
        'Alfa Romeo': { 'Giulia': ['Sprint', 'Ti', 'Veloce', 'Quadrifoglio'], 'Stelvio': ['Sprint', 'Ti', 'Veloce', 'Quadrifoglio'], '4C': ['Coupe', 'Spider'] },
        'Aston Martin': { 'Vantage': ['V8', 'V12', 'F1 Edition'], 'DB11': ['V8', 'V12', 'Volante'], 'DB12': ['Coupe', 'Volante'], 'DBS': ['Superleggera', '770 Ultimate'], 'Vanquish': ['Coupe', 'Volante'], 'Valkyrie': ['Coupe', 'Spider', 'AMR Pro'], 'DBX': ['Base', '707', 'S'], 'One-77': ['Base'] },
        'Audi': { 'A3': ['Premium', 'Premium Plus', 'Prestige'], 'S3': ['Premium', 'Premium Plus', 'Prestige'], 'RS 3': ['Base'], 'A4': ['Premium', 'Premium Plus', 'Prestige'], 'S4': ['Premium', 'Premium Plus', 'Prestige'], 'RS 4': ['Avant'], 'A5': ['Premium', 'Premium Plus', 'Prestige'], 'S5': ['Premium', 'Premium Plus', 'Prestige'], 'RS 5': ['Coupe', 'Sportback'], 'A6': ['Premium', 'Premium Plus', 'Prestige'], 'S6': ['Premium Plus', 'Prestige'], 'RS 6': ['Avant', 'Performance'], 'A7': ['Premium Plus', 'Prestige'], 'S7': ['Premium Plus', 'Prestige'], 'RS 7': ['Performance'], 'Q5': ['Premium', 'Premium Plus', 'Prestige'], 'SQ5': ['Premium Plus', 'Prestige'], 'Q7': ['Premium', 'Premium Plus', 'Prestige'], 'SQ7': ['Premium Plus', 'Prestige'], 'Q8': ['Premium', 'Premium Plus', 'Prestige'], 'RS Q8': ['Base', 'Performance'], 'R8': ['V8', 'V10', 'V10 Plus', 'Performance', 'GT'], 'TT': ['Coupe', 'Roadster', 'TTS', 'TT RS'] },
        'Bentley': { 'Continental GT': ['Azure', 'S', 'Speed', 'Mulliner'], 'Flying Spur': ['Azure', 'S', 'Speed', 'Mulliner'], 'Bentayga': ['S', 'Azure', 'Speed', 'EWB Mulliner'], 'Bacalar': ['Mulliner'], 'Batur': ['Mulliner'] },
        'BMW': { '2 Series': ['230i', 'M240i'], 'M2': ['Base', 'Competition', 'CS'], '3 Series': ['320i', '330i', '330e', '340i'], 'M3': ['Base', 'Competition', 'CS', 'CSL'], '4 Series': ['430i', 'M440i'], 'M4': ['Base', 'Competition', 'CS', 'CSL'], '5 Series': ['530i', '540i', '550e', 'M550i'], 'M5': ['Base', 'Competition', 'CS'], '8 Series': ['840i', 'M850i'], 'M8': ['Base', 'Competition', 'CS'], 'Z4': ['sDrive30i', 'M40i'], 'X3': ['sDrive30i', 'xDrive30i', 'M40i'], 'X3 M': ['Base', 'Competition'], 'X4': ['xDrive30i', 'M40i'], 'X4 M': ['Base', 'Competition'], 'X5': ['sDrive40i', 'xDrive40i', 'xDrive50e', 'M60i'], 'X5 M': ['Base', 'Competition'], 'X6': ['xDrive40i', 'M60i'], 'X6 M': ['Base', 'Competition'], 'XM': ['Base', 'Label'], 'i8': ['Coupe', 'Roadster'] },
        'Bugatti': { 'Chiron': ['Base', 'Sport', 'Pur Sport', 'Super Sport', 'Super Sport 300+'], 'Veyron': ['16.4', 'Grand Sport', 'Super Sport', 'Grand Sport Vitesse'], 'Divo': ['Base'], 'Bolide': ['Track version'], 'Tourbillon': ['Base'] },
        'Cadillac': { 'ATS-V': ['Coupe', 'Sedan'], 'CT4': ['Luxury', 'Premium Luxury', 'Sport'], 'CT4-V Blackwing': ['6-speed manual', '10-speed automatic'], 'CT5': ['Luxury', 'Premium Luxury', 'Sport'], 'CT5-V Blackwing': ['6-speed manual', '10-speed automatic'], 'CTS-V': ['Gen II', 'Gen III'], 'Escalade': ['Luxury', 'Premium Luxury', 'Sport', 'V-Series'] },
        'Chevrolet': { 'Corvette': ['C5 Base', 'C6 Z06', 'C6 ZR1', 'C7 Stingray', 'C7 Grand Sport', 'C7 Z06', 'C7 ZR1', 'C8 Stingray', 'C8 E-Ray', 'C8 Z06', 'C8 ZR1'], 'Camaro': ['LS', 'LT1', 'SS', 'SS 1LE', 'ZL1', 'ZL1 1LE', 'Z/28'], 'Chevelle': ['SS 396', 'SS 454'], 'Impala': ['SS'], 'SS': ['Base'], 'Silverado': ['WT', 'LT', 'RST', 'LTZ', 'High Country', 'ZR2'] },
        'Dodge': { 'Challenger': ['SXT', 'GT', 'R/T', 'Scat Pack', '392', 'Hellcat', 'Hellcat Redeye', 'Super Stock', 'Demon', 'Demon 170'], 'Charger': ['SXT', 'GT', 'R/T', 'Scat Pack', 'Hellcat', 'Hellcat Redeye', 'Daytona', 'SRT 392'], 'Viper': ['RT/10', 'GTS', 'SRT-10', 'ACR', 'TA'], 'Durango': ['GT', 'R/T', 'Citadel', 'SRT 392', 'SRT Hellcat'], 'Neon SRT-4': ['Base'] },
        'Ferrari': { '296 GTB': ['Assetto Fiorano'], '296 GTS': ['Assetto Fiorano'], 'F8 Tributo': ['Coupe', 'Spider'], 'SF90 Stradale': ['Assetto Fiorano'], 'SF90 Spider': ['Assetto Fiorano'], '812 Superfast': ['GTS'], '812 Competizione': ['Coupe', 'A'], '12Cilindri': ['Coupe', 'Spider'], 'Roma': ['Coupe', 'Spider'], 'Portofino': ['M'], '488 GTB': ['Pista', 'Pista Spider'], '458 Italia': ['Spider', 'Speciale', 'Speciale A'], '430 Scuderia': ['Coupe', '16M Spider'], 'F40': ['Base'], 'F50': ['Base'], 'Daytona SP3': ['Icona'] },
        'Ford': { 'Mustang': ['EcoBoost', 'EcoBoost Premium', 'GT', 'GT Premium', 'California Special', 'Mach 1', 'Dark Horse', 'Dark Horse Premium', 'Shelby GT350', 'Shelby GT350R', 'Shelby GT500'], 'GT': ['Mk I', 'Mk II', 'Mk IV'], 'Focus RS': ['Base'], 'Focus ST': ['Base'], 'Bronco': ['Base', 'Big Bend', 'Black Diamond', 'Outer Banks', 'Badlands', 'Wildtrak', 'Raptor'], 'Bronco Raptor': ['Base'], 'F-150': ['XL', 'XLT', 'Lariat', 'King Ranch', 'Platinum', 'Limited'], 'F-150 Raptor': ['Raptor', 'Raptor R'] },
        'Genesis': { 'G70': ['2.0T', '3.3T Sport'], 'G80': ['2.5T', '3.5T Sport'], 'G90': ['3.5T', '3.5T E-Supercharger'], 'GV70': ['2.5T', '3.5T Sport'], 'GV80': ['2.5T', '3.5T'] },
        'Honda': { 'Civic': ['LX', 'Sport', 'Si', 'Type R'], 'Civic Type R': ['Base', 'Limited Edition', 'Touring'], 'Integra': ['Base', 'A-Spec', 'A-Spec Tech', 'Type S'], 'S2000': ['AP1', 'AP2'], 'NSX': ['Base', 'Type S'], 'Prelude': ['Base', 'SH'] },
        'Hyundai': { 'Elantra N': ['Base'], 'Veloster N': ['Performance Package'], 'Kona N': ['Base'], 'Ioniq 5 N': ['Base'], 'Genesis Coupe': ['2.0T', '3.8 R-Spec', '3.8 Track', '3.8 Ultimate'] },
        'Hennessey': { 'Venom F5': ['Coupe', 'Roadster', 'Revolution'], 'Venom GT': ['Coupe', 'Spyder'], 'Exorcist': ['Camaro ZL1 package'] },
        'Koenigsegg': { 'CCX': ['Base', 'Edition'], 'Agera': ['Agera R', 'Agera S', 'Agera RS'], 'Jesko': ['Attack', 'Absolut'], 'Regera': ['Base'], 'Gemera': ['HV8'], 'CC850': ['Base'], 'One:1': ['Base'] },
        'Jaguar': { 'F-Type': ['P300', 'P380', 'P450', 'R-Dynamic', 'R'], 'E-Type': ['Series 1', 'Series 2', 'Series 3'] },
        'Jeep': { 'Wrangler': ['Sport', 'Willys', 'Sahara', 'Rubicon', '4xe', '392'], 'Grand Cherokee': ['Laredo', 'Limited', 'Overland', 'Summit', 'Trailhawk'], 'Grand Cherokee Trackhawk': ['Base'], 'Gladiator': ['Sport', 'Overland', 'Rubicon', 'Mojave'] },
        'Kia': { 'Stinger': ['GT-Line', 'GT1', 'GT2'], 'EV6 GT': ['Base'], 'K5 GT': ['Base'], 'Forte GT': ['Base'] },
        'Lamborghini': { 'Huracán': ['LP 610-4', 'LP 580-2', 'EVO', 'EVO RWD', 'Performante', 'Tecnica', 'STO', 'Sterrato', 'STJ'], 'Aventador': ['LP 700-4', 'S', 'SV', 'SVJ', 'Ultimae'], 'Revuelto': ['Ad Personam'], 'Urus': ['S', 'Performante', 'SE'], 'Gallardo': ['LP 550-2', 'LP 560-4', 'Superleggera', 'Performante'], 'Murciélago': ['LP 580-2', 'LP 640', 'LP 670-4 SV'], 'Diablo': ['VT', 'SV', 'GT', 'GTR'], 'Countach': ['LP400', 'LP5000 QV', '25th Anniversary', 'LPI 800-4'], 'Essenza SCV12': ['Base'], 'Centenario': ['Coupe', 'Roadster'], 'Sian': ['FKP 37', 'Roadster'], 'Reventón': ['Coupe', 'Roadster'] },
        'Lexus': { 'RC F': ['Base', 'Track Edition'], 'LC 500': ['Coupe', 'Convertible'], 'LFA': ['Base', 'Nürburgring Package'], 'IS 500': ['Premium', 'F Sport Performance'], 'IS F': ['Base'], 'GS F': ['Base'] },
        'Lotus': { 'Emira': ['First Edition', 'V6', 'Turbo'], 'Evora': ['400', 'GT', 'GT430'], 'Exige': ['Sport 350', 'Sport 380', 'Cup 430'], 'Elise': ['Sport', 'Cup'], 'Evija': ['Base'] },
        'Maserati': { 'MC20': ['Coupe', 'Cielo', 'GT2 Stradale'], 'GranTurismo': ['Modena', 'Trofeo', 'Folgore'], 'Ghibli': ['GT', 'Modena', 'Trofeo'], 'Quattroporte': ['Modena', 'Trofeo'], 'MC12': ['Stradale', 'Versione Corse'] },
        'Mazda': { 'MX-5 Miata': ['Sport', 'Club', 'Grand Touring', 'RF'], 'RX-7': ['Base', 'Turbo II', 'GT-X', 'Spirit R', 'Type R'], 'RX-8': ['Base', 'Sport', 'Grand Touring', 'R3'], 'Cosmo': ['13B', '20B'] },
        'McLaren': { '570S': ['Coupe', 'Spider'], '600LT': ['Coupe', 'Spider'], '620R': ['Base'], '720S': ['Performance', 'Luxury', 'Spider'], '750S': ['Coupe', 'Spider'], '765LT': ['Coupe', 'Spider'], 'Artura': ['Coupe', 'Spider'], 'P1': ['Base', 'GTR'], 'Senna': ['Base', 'GTR'], 'Speedtail': ['Base'], 'F1': ['Road Car', 'LM', 'GTR'], 'Solus GT': ['Track-only'] },
        'Mercedes-Benz': { 'A-Class': ['A 220', 'AMG A 35', 'AMG A 45 S'], 'C-Class': ['C 300', 'AMG C 43', 'AMG C 63'], 'C 63 AMG': ['Sedan', 'Coupe', 'S'], 'E-Class': ['E 350', 'E 450', 'AMG E 53', 'AMG E 63 S'], 'E 63 AMG': ['S'], 'S-Class': ['S 500', 'S 580', 'AMG S 63'], 'AMG GT': ['GT', 'GT S', 'GT C', 'GT R', 'GT Black Series', '63', '63 S'], 'G-Class': ['G 550', 'AMG G 63'], 'GLC': ['GLC 300', 'AMG GLC 43', 'AMG GLC 63'], 'GLE': ['GLE 350', 'GLE 450', 'AMG GLE 53', 'AMG GLE 63 S'], 'SLS AMG': ['Coupe', 'Roadster', 'Black Series'] },
        'Mini': { 'Cooper': ['Hardtop 2 Door', 'Hardtop 4 Door', 'Convertible'], 'Cooper S': ['Hardtop', 'Convertible'], 'John Cooper Works': ['Hardtop', 'Convertible', 'GP'], 'Countryman': ['Cooper', 'Cooper S', 'JCW', 'ALL4'], 'Clubman': ['Cooper S', 'JCW', 'ALL4'] },
        'Mitsubishi': { 'Lancer Evolution': ['VII', 'VIII', 'IX', 'X', 'MR', 'Final Edition'], '3000GT': ['SL', 'VR-4'], 'Eclipse': ['GS', 'GS-T', 'GSX'] },
        'Nissan': { 'GT-R': ['Premium', 'Black Edition', 'Track Edition', 'Nismo', 'T-Spec'], 'Z': ['Sport', 'Performance', 'Nismo'], '370Z': ['Base', 'Sport', 'Sport Touring', 'Nismo'], '350Z': ['Base', 'Enthusiast', 'Performance', 'Track', 'Touring', 'Grand Touring', 'Nismo'], 'Silvia': ['S13', 'S14', 'S15'], 'Skyline': ['GT-R R32', 'GT-R R33', 'GT-R R34', 'GTS-t'], '240SX': ['S13', 'S14', 'SE', 'LE'], '180SX': ['Type I', 'Type II', 'Type III'] },
        'Pagani': { 'Zonda': ['C12', 'F', 'Roadster F', 'Cinque', 'Tricolore', 'R'], 'Huayra': ['Coupe', 'Roadster', 'BC', 'R', 'Codalunga'], 'Utopia': ['Coupe', 'Roadster'], 'Imola': ['Base'] },
        'Porsche': { '911': ['Carrera', 'Carrera T', 'Carrera S', 'Carrera GTS', 'Turbo', 'Turbo S', 'GT3', 'GT3 Touring', 'GT3 RS', 'GT2 RS', 'Dakar', 'Sport Classic', 'S/T'], '718 Cayman': ['Base', 'S', 'GTS 4.0', 'GT4', 'GT4 RS'], '718 Boxster': ['Base', 'S', 'GTS 4.0', 'Spyder', 'Spyder RS'], 'Cayenne': ['Base', 'S', 'GTS', 'Turbo', 'Turbo GT', 'E-Hybrid'], 'Macan': ['Base', 'S', 'GTS', 'Electric 4', 'Electric Turbo'], 'Panamera': ['Base', '4', '4S', 'GTS', 'Turbo S', 'Turbo E-Hybrid'], 'Taycan': ['4S', 'GTS', 'Turbo', 'Turbo S', 'Turbo GT'], 'Carrera GT': ['Base'], '918 Spyder': ['Base', 'Weissach Package'], '944': ['Base', 'S', 'S2', 'Turbo'], '928': ['Base', 'S4', 'GTS'] },
        'Subaru': { 'WRX': ['Base', 'Premium', 'Limited', 'TR', 'tS'], 'WRX STI': ['Base', 'Limited', 'Type RA', 'S209'], 'BRZ': ['Premium', 'Limited', 'tS'], 'Legacy GT': ['GT', 'Spec.B'], 'Impreza 22B': ['STi 22B'] },
        'Tesla': { 'Model S': ['Long Range', 'Plaid'], 'Model 3': ['Standard Range', 'Long Range', 'Performance'], 'Model X': ['Long Range', 'Plaid'], 'Model Y': ['Long Range', 'Performance'], 'Roadster': ['Base', 'Founders Series'] },
        'Toyota': { 'GR Supra': ['2.0', '3.0', '3.0 Premium', 'A91', 'A91-CF'], 'Supra': ['Turbo', 'Twin Turbo', 'RZ', 'SZ-R'], 'GR86': ['Base', 'Premium', 'Hakone Edition'], '86': ['Base', 'GT', 'GT Black Limited'], 'GR Corolla': ['Core', 'Premium', 'Circuit Edition', 'Morizo Edition'], 'Corolla': ['LE', 'SE', 'XSE', 'GR Sport'], 'Camry': ['LE', 'SE', 'XLE', 'XSE', 'TRD', 'TRD V6'], 'MR2': ['AW11', 'SW20', 'ZZW30'], 'Land Cruiser': ['Base', 'First Edition'], '4Runner': ['SR5', 'TRD Sport', 'TRD Off-Road', 'Limited', 'TRD Pro', 'Trailhunter'] },
        'Volkswagen': { 'Golf GTI': ['S', 'SE', 'Autobahn'], 'Golf R': ['Base', '20th Anniversary', 'Black Edition'], 'Jetta GLI': ['S', 'Autobahn'], 'Arteon': ['SE', 'SEL R-Line', 'SEL Premium R-Line'] },
        'Volvo': { 'S60': ['Core', 'Plus', 'Ultimate', 'Polestar Engineered'], 'V60 Polestar': ['Polestar Engineered'], 'XC60': ['Core', 'Plus', 'Ultimate', 'Polestar Engineered'], 'XC90': ['Core', 'Plus', 'Ultimate'] }
    };
    const submodelAdditions = {
        'Acura': {
            'ILX': ['Base', 'Premium', 'Technology Plus', 'A-Spec'], 'RDX': ['Base', 'Technology', 'A-Spec', 'Advance'], 'TSX': ['Base', 'Technology', 'Special Edition']
        },
        'Alfa Romeo': { '8C': ['Competizione', 'Spider'], 'Tonale': ['Sprint', 'Ti', 'Veloce'] },
        'Audi': {
            'Q3': ['Premium', 'Premium Plus', 'Prestige', 'S line'], 'A8': ['L 55 TFSI', 'L 60 TFSI', 'S8'],
            'TT': ['Coupe', 'Roadster', 'TTS', 'TT RS'], 'Q7': ['Premium', 'Premium Plus', 'Prestige'],
            'SQ7': ['Premium Plus', 'Prestige'], 'Q8': ['Premium', 'Premium Plus', 'Prestige'],
            'RS Q8': ['Base', 'Performance'], 'A7': ['Premium', 'Premium Plus', 'Prestige'],
            'S7': ['Premium Plus', 'Prestige'], 'A8': ['Premium', 'Premium Plus', 'Prestige', 'S8']
        },
        'Bentley': { 'Mulsanne': ['Base', 'Speed', 'Extended Wheelbase'] },
        'BMW': {
            '1 Series': ['128i', '135i', 'M135i', 'M140i'], '4 Series': ['420i', '430i', '440i', 'M440i'],
            '6 Series': ['640i', '650i', 'M6'], '7 Series': ['740i', '750i', '760i', 'ALPINA B7'],
            'X1': ['sDrive28i', 'xDrive28i', 'M35i'], 'X7': ['xDrive40i', 'M60i', 'ALPINA XB7'],
            'Z3': ['1.9', '2.8', '3.0i', 'M Roadster', 'M Coupe'], 'i4': ['eDrive35', 'eDrive40', 'xDrive40', 'M50'],
            'i5': ['eDrive40', 'xDrive40', 'M60'], 'i7': ['eDrive50', 'xDrive60', 'M70'],
            'i8': ['Coupe', 'Roadster'], 'X5': ['xDrive35i', 'xDrive40i', 'xDrive50i', 'M50i', 'M60i', 'M Competition']
        },
        'Buick': { 'Regal': ['Preferred', 'Essence', 'GS'], 'Grand National': ['Base'], 'GNX': ['Base'] },
        'Cadillac': { 'Celestiq': ['Base', 'Commissioned build'], 'CT5': ['Luxury', 'Premium Luxury', 'Sport', 'V-Series'] },
        'Chevrolet': {
            'Blazer': ['LT', 'RS', 'Premier', 'SS EV'], 'Tahoe': ['LS', 'LT', 'RST', 'Z71', 'Premier', 'High Country'],
            'Monte Carlo': ['LS', 'SS', 'Z34'], 'El Camino': ['Base', 'SS'], 'Impala': ['LS', 'LT', 'Premier', 'SS']
        },
        'Chrysler': { '300': ['Touring', 'Touring L', '300S', '300C'], 'Crossfire': ['Base', 'Limited', 'SRT-6'], 'Prowler': ['Base'] },
        'Dodge': { 'Ram SRT-10': ['Regular Cab', 'Quad Cab'], 'Neon SRT-4': ['Base', 'ACR'] },
        'Fiat': { '500': ['Pop', 'Sport', 'Lounge', 'Abarth', 'e'], '124 Spider': ['Classica', 'Lusso', 'Abarth'], 'X1/9': ['Base'] },
        'GMC': {
            'Sierra': ['Pro', 'SLE', 'Elevation', 'SLT', 'AT4', 'Denali', 'Denali Ultimate'],
            'Yukon': ['SLE', 'SLT', 'AT4', 'Denali', 'Denali Ultimate'], 'Typhoon': ['Base'],
            'Syclone': ['Base'], 'Hummer EV': ['Pickup 2X', 'Pickup 3X', 'SUV 2X', 'SUV 3X']
        },
        'Infiniti': {
            'G35': ['Base', 'Journey', 'Sport', 'x AWD'], 'G37': ['Base', 'Journey', 'Sport', 'IPL'],
            'Q50': ['Pure', 'Luxe', 'Sensory', 'Red Sport 400'], 'Q60': ['Pure', 'Luxe', 'Sport', 'Red Sport 400'], 'QX80': ['Luxe', 'Sensory', 'Autograph']
        },
        'Jaguar': {
            'F-Pace': ['P250', 'P340', 'P400', 'SVR'], 'XJ': ['XJ8', 'XJR', 'XJL', 'XJ Supersport'],
            'XK': ['XK', 'XKR', 'XKR-S'], 'XE': ['S', 'SE', 'R-Dynamic', 'Project 8']
        },
        'Jeep': { 'Cherokee': ['Latitude', 'Limited', 'Trailhawk', 'Overland'] },
        'Kia': { 'K5 GT': ['GT-Line', 'GT'], 'Forte GT': ['GT-Line', 'GT'], 'Stinger': ['2.0T', '2.5T', '3.3T GT-Line', 'GT1', 'GT2'] },
        'Land Rover': {
            'Defender': ['90', '110', '130', 'S', 'SE', 'X-Dynamic', 'X', 'V8'],
            'Range Rover Sport': ['SE', 'Dynamic SE', 'Autobiography', 'SV'],
            'Range Rover': ['SE', 'HSE', 'Autobiography', 'SV'], 'Discovery': ['S', 'SE', 'HSE', 'Metropolitan Edition']
        },
        'Lexus': { 'NX': ['NX 250', 'NX 350', 'NX 350h', 'NX 450h+', 'F Sport'], 'GX': ['GX 460', 'GX 550 Premium', 'GX 550 Overtrail', 'GX 550 Luxury'], 'LX': ['LX 600', 'LX 700h'] },
        'Lincoln': { 'Continental': ['Standard', 'Select', 'Reserve', 'Black Label'], 'Navigator': ['Premiere', 'Reserve', 'Black Label'], 'Aviator': ['Premiere', 'Reserve', 'Black Label'] },
        'Lotus': { 'Esprit': ['S1', 'S2', 'Turbo', 'V8'], 'Eletre': ['Base', 'S', 'R'] },
        'Maserati': { 'Grecale': ['GT', 'Modena', 'Trofeo', 'Folgore'] },
        'Mercedes-Benz': {
            'CLA': ['CLA 250', 'AMG CLA 35', 'AMG CLA 45 S'], 'CLK': ['CLK 320', 'CLK 430', 'CLK 500', 'CLK 55 AMG', 'CLK 63 AMG'],
            'GLC': ['GLC 300', 'AMG GLC 43', 'AMG GLC 63 S E Performance'], 'GLE': ['GLE 350', 'GLE 450', 'AMG GLE 53', 'AMG GLE 63 S'],
            'S-Class': ['S 450', 'S 500', 'S 580', 'AMG S 63', 'Maybach S 580', 'Maybach S 680']
        },
        'Mitsubishi': { 'Eclipse Cross': ['ES', 'LE', 'SE', 'SEL'], 'Galant VR-4': ['Base'] },
        'Nissan': {
            'Maxima': ['SV', 'SR', 'Platinum'], 'Sentra Nismo': ['Nismo'], 'Figaro': ['Base'],
            'Skyline': ['GT-R R32', 'GT-R R33', 'GT-R R34', 'GTS', 'GTS-t', 'GT-X'],
            'GT-R': ['Premium', 'Black Edition', 'Track Edition', 'Nismo', 'T-Spec', 'Nismo Special Edition']
        },
        'Polestar': { '1': ['Launch Edition'], '2': ['Standard Range Single Motor', 'Long Range Single Motor', 'Long Range Dual Motor', 'Performance Pack'], '3': ['Long Range Dual Motor', 'Performance Pack'], '4': ['Long Range Single Motor', 'Long Range Dual Motor'] },
        'Pontiac': { 'GTO': ['Base', 'Judge'], 'Firebird': ['Base', 'Formula', 'Trans Am', 'WS6'], 'Trans Am': ['Base', 'WS6', 'Firehawk'], 'Solstice': ['Base', 'GXP'], 'Fiero': ['Base', 'GT', 'Formula'], 'G8': ['Base', 'GT', 'GXP'] },
        'Porsche': {
            'Macan': ['Base', 'T', 'S', 'GTS', 'Electric', 'Electric 4S', 'Electric Turbo'],
            'Cayenne': ['Base', 'E-Hybrid', 'S', 'S E-Hybrid', 'GTS', 'Turbo E-Hybrid', 'Turbo GT'],
            'Panamera': ['Base', '4', '4 E-Hybrid', '4S', 'GTS', 'Turbo S', 'Turbo E-Hybrid'],
            'Taycan': ['Base', '4', '4S', 'GTS', 'Turbo', 'Turbo S', 'Turbo GT', 'Cross Turismo', 'Sport Turismo']
        },
        'Ram': { '1500': ['Tradesman', 'Big Horn', 'Laramie', 'Rebel', 'Limited', 'Longhorn', 'RHO'], '1500 TRX': ['Base', 'Sandblast Edition'], '2500': ['Tradesman', 'Big Horn', 'Laramie', 'Power Wagon', 'Limited'] },
        'Rivian': { 'R1T': ['Adventure', 'Explore', 'Dual-Motor', 'Performance Dual-Motor', 'Quad-Motor'], 'R1S': ['Adventure', 'Explore', 'Dual-Motor', 'Performance Dual-Motor', 'Quad-Motor'] },
        'Rolls-Royce': { 'Ghost': ['Standard', 'Extended', 'Black Badge'], 'Wraith': ['Base', 'Black Badge'], 'Dawn': ['Base', 'Black Badge'], 'Cullinan': ['Base', 'Black Badge'], 'Spectre': ['Base', 'Black Badge'], 'Phantom': ['Standard Wheelbase', 'Extended Wheelbase'] },
        'Tesla': { 'Cybertruck': ['Rear-Wheel Drive', 'All-Wheel Drive', 'Cyberbeast'], 'Roadster': ['Base', 'Founders Series'] },
        'Toyota': {
            'Tacoma': ['SR', 'SR5', 'TRD PreRunner', 'TRD Sport', 'TRD Off-Road', 'Limited', 'Trailhunter', 'TRD Pro'],
            'Celica': ['GT', 'GT-S', 'All-Trac Turbo'], 'Chaser': ['Tourer S', 'Tourer V', 'Avante'],
            'Crown': ['Limited', 'Platinum', 'Signia'], 'Camry': ['LE', 'SE', 'XLE', 'XSE', 'TRD', 'Nightshade'],
            'Corolla': ['LE', 'SE', 'XLE', 'XSE', 'GR Sport', 'Apex Edition']
        },
        'Volkswagen': { 'Tiguan': ['S', 'SE', 'SE R-Line Black', 'SEL R-Line'], 'Scirocco': ['GT', 'GT TDI', 'R-Line', 'R'], 'Corrado': ['G60', 'VR6'] },
        'Volvo': { 'S90': ['Core', 'Plus', 'Ultimate', 'Recharge'], 'XC60': ['Core', 'Plus', 'Ultimate', 'Recharge'], 'XC90': ['Core', 'Plus', 'Ultimate', 'Recharge'] }
    };
    for (const [make, models] of Object.entries(submodelAdditions)) {
        if (!submodelCatalog[make])
            submodelCatalog[make] = {};
        Object.assign(submodelCatalog[make], models);
    }
    let db = null;
    let dbMode = 'indexeddb';
    let data = { spots: [], runs: [], activeRunId: null, homeHeroPhoto: '' };
    let currentPhoto = '';
    let currentLocation = null;
    let guidedDemoCar = null;
    let currentDetailId = null;
    let currentEditId = null;
    let currentRunDetailId = null;
    let editPhoto = '';
    let spotMap = null, spotMarker = null, garageMap = null, garageMarkers = [];
    let garageMapResizeObserver = null, garageTileLayer = null, garageTileErrorCount = 0, garageTileFallbackUsed = false, leafletFallbackPromise = null;
    let toastTimer = null;
    let persistChain = Promise.resolve();
    const PROFILE_KEY = 'carspotter.profile.v1';
    let profile = { name: 'Car enthusiast', avatar: '', reduceMotion: false, largeText: false, highContrast: false };
    const escapeHTML = value => String(value ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
    const id = () => (window.crypto?.randomUUID ? window.crypto.randomUUID() : `${Date.now()}-${Math.random().toString(36).slice(2)}`);
    const clone = value => (typeof structuredClone === 'function' ? structuredClone(value) : JSON.parse(JSON.stringify(value)));
    const fmtDate = (value, opts = { month: 'short', day: 'numeric', year: 'numeric' }) => value ? new Date(value).toLocaleDateString(undefined, opts) : '—';
    const fmtDateTime = value => { const date = value ? new Date(value) : null; return date && Number.isFinite(date.getTime()) ? date.toLocaleString(undefined, { month: 'long', day: 'numeric', year: 'numeric', hour: 'numeric', minute: '2-digit' }) : '—'; };
    function toLocalDateTimeInput(value = new Date()) {
        const date = value instanceof Date ? value : new Date(value);
        if (!Number.isFinite(date.getTime()))
            return '';
        const pad = number => String(number).padStart(2, '0');
        return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}T${pad(date.getHours())}:${pad(date.getMinutes())}`;
    }
    function fromLocalDateTimeInput(value) {
        if (!value)
            return null;
        const date = new Date(value);
        return Number.isFinite(date.getTime()) ? date.toISOString() : null;
    }
    const fmtMonth = value => value ? new Date(value).toLocaleDateString(undefined, { month: 'short' }).toUpperCase() : '';
    const bytesLabel = bytes => bytes < 1024 ? `${bytes} B` : bytes < 1024 * 1024 ? `${(bytes / 1024).toFixed(0)} KB` : `${(bytes / 1024 / 1024).toFixed(1)} MB`;
    function showToast(message) { const el = getElement('toast'); el.textContent = message; el.classList.add('show'); clearTimeout(toastTimer); toastTimer = setTimeout(() => el.classList.remove('show'), 3000); }
    const modalFocusStack = [];
    function topOpenModal() {
        return [...document.querySelectorAll('.modal-backdrop.show')]
            .sort((a, b) => Number(getComputedStyle(b).zIndex || 100) - Number(getComputedStyle(a).zIndex || 100))[0] || null;
    }
    function showModal(id) {
        const modal = getElement(id);
        if (!modal)
            return;
        const previous = document.activeElement;
        const open = [...document.querySelectorAll('.modal-backdrop.show')];
        const highest = open.reduce((max, item) => Math.max(max, Number(getComputedStyle(item).zIndex) || 100), 99);
        modal.style.zIndex = String(highest + 1);
        modalFocusStack.push({ id, previous });
        modal.classList.add('show');
        const first = modal.querySelector('input:not([type=hidden]),select,button,[tabindex="0"]');
        if (first)
            setTimeout(() => {
                if (modal.classList.contains('show'))
                    first.focus();
            }, 50);
    }
    function hideModal(id) {
        const modal = getElement(id);
        if (!modal)
            return;
        const wasTop = topOpenModal() === modal;
        modal.classList.remove('show');
        modal.style.removeProperty('z-index');
        let stackIndex = -1;
        for (let i = modalFocusStack.length - 1; i >= 0; i--) {
            if (modalFocusStack[i].id === id) {
                stackIndex = i;
                break;
            }
        }
        const entry = stackIndex >= 0 ? modalFocusStack.splice(stackIndex, 1)[0] : null;
        const nextTop = topOpenModal();
        if (wasTop && entry?.previous?.isConnected && entry.previous.getClientRects().length) {
            if (!nextTop || entry.previous.closest('.modal-backdrop') === nextTop)
                entry.previous.focus();
        }
    }
    document.querySelectorAll('[data-close-modal]').forEach(btn => btn.addEventListener('click', () => hideModal(btn.dataset.closeModal)));
    document.querySelectorAll('.modal-backdrop').forEach(backdrop => backdrop.addEventListener('click', e => {
        if (e.target === backdrop)
            hideModal(backdrop.id);
    }));
    document.addEventListener('keydown', e => {
        const open = topOpenModal();
        if (e.key === 'Escape' && open) {
            hideModal(open.id);
            return;
        }
        if (e.key !== 'Tab' || !open)
            return;
        const items = [...open.querySelectorAll('button:not(:disabled),input:not(:disabled):not([type=hidden]),select:not(:disabled),textarea:not(:disabled),a[href]')].filter(el => el.getClientRects().length > 0);
        if (!items.length)
            return;
        const first = items[0], last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
        else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    });
    function setTheme(theme) {
        const mode = theme === 'light' ? 'light' : 'dark';
        document.body.dataset.theme = mode;
        getElement('themeText').textContent = mode === 'light' ? 'DARK' : 'LIGHT';
        if (getElement('profileThemeSelect'))
            getElement('profileThemeSelect').value = mode;
        getElement('themeToggle').setAttribute('aria-label', mode === 'light' ? 'Switch to dark mode' : 'Switch to light mode');
        getElement('themeIcon').innerHTML = mode === 'light' ? '<path d="M20.9 13A8.5 8.5 0 0 1 11 3.1 8.7 8.7 0 1 0 20.9 13Z"/>' : '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>';
        try {
            localStorage.setItem(THEME_KEY, mode);
        }
        catch { }
        document.querySelector('meta[name="theme-color"]').content = mode === 'light' ? '#f3f6fb' : '#0d1523';
    }
    let theme = 'light';
    try {
        theme = localStorage.getItem(THEME_KEY) || 'light';
    }
    catch { }
    setTheme(theme);
    getElement('themeToggle').addEventListener('click', () => setTheme(document.body.dataset.theme === 'light' ? 'dark' : 'light'));
    function openDatabase() {
        return new Promise((resolve, reject) => {
            if (!('indexedDB' in window)) {
                reject(new Error('This browser does not support local database storage.'));
                return;
            }
            const request = indexedDB.open(DB_NAME, DB_VERSION);
            request.onupgradeneeded = () => {
                const database = request.result;
                if (!database.objectStoreNames.contains(STORE_NAME))
                    database.createObjectStore(STORE_NAME);
            };
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error || new Error('Could not open local database.'));
            request.onblocked = () => reject(new Error('The local database is busy. Close other CarSpotter tabs and reload.'));
        });
    }
    function dbRead() { return new Promise((resolve, reject) => { const tx = db.transaction(STORE_NAME, 'readonly'); const req = tx.objectStore(STORE_NAME).get('root'); req.onsuccess = () => resolve(req.result || null); req.onerror = () => reject(req.error); }); }
    function dbWrite(value) { return new Promise((resolve, reject) => { const tx = db.transaction(STORE_NAME, 'readwrite'); tx.objectStore(STORE_NAME).put(value, 'root'); tx.oncomplete = () => resolve(true); tx.onerror = () => reject(tx.error || new Error('Save failed')); tx.onabort = () => reject(tx.error || new Error('Save was interrupted')); }); }
    function normalizeData(saved) {
        const spots = Array.isArray(saved?.spots) ? saved.spots.filter(s => s && typeof s === 'object').map(s => ({ id: String(s.id || id()), make: String(s.make || 'Unknown'), model: String(s.model || 'Unknown'), trim: String(s.trim || ''), year: Number.isFinite(Number(s.year)) && Number(s.year) >= 1886 && Number(s.year) <= 2099 ? Number(s.year) : null, color: String(s.color || ''), place: String(s.place || ''), notes: String(s.notes || ''), favorite: !!s.favorite, photo: typeof s.photo === 'string' && /^data:image\/(?:jpeg|png|webp);base64,/i.test(s.photo) ? s.photo : '', location: s.location && Number.isFinite(Number(s.location.lat)) && Number.isFinite(Number(s.location.lng)) ? { lat: Number(s.location.lat), lng: Number(s.location.lng), accuracy: Number.isFinite(Number(s.location.accuracy)) && Number(s.location.accuracy) > 0 ? Number(s.location.accuracy) : null } : null, createdAt: s.createdAt && Number.isFinite(new Date(s.createdAt).getTime()) ? new Date(s.createdAt).toISOString() : new Date().toISOString(), runId: s.runId || null })) : [];
        const runs = Array.isArray(saved?.runs) ? saved.runs.filter(r => r && typeof r === 'object').map(r => ({ id: String(r.id || id()), name: String(r.name || 'Untitled run'), startedAt: r.startedAt || new Date().toISOString(), endedAt: r.endedAt || null })) : [];
        const runIds = new Set(runs.map(r => r.id));
        spots.forEach(s => {
            if (s.runId && !runIds.has(s.runId))
                s.runId = null;
        });
        const active = runs.find(r => r.id === saved?.activeRunId && !r.endedAt);
        return { spots, runs, activeRunId: active ? active.id : null, homeHeroPhoto: typeof saved?.homeHeroPhoto === 'string' && /^data:image\/(?:jpeg|png|webp);base64,/i.test(saved.homeHeroPhoto) ? saved.homeHeroPhoto : '' };
    }
    async function bootStorage() {
        try {
            db = await openDatabase();
            dbMode = 'indexeddb';
            const stored = await dbRead();
            if (stored && Array.isArray(stored.spots) && Array.isArray(stored.runs)) {
                data = normalizeData(stored);
                return;
            }
            let legacy = null;
            for (const key of LEGACY_KEYS) {
                try {
                    const raw = localStorage.getItem(key);
                    if (raw) {
                        legacy = JSON.parse(raw);
                        break;
                    }
                }
                catch { }
            }
            if (!legacy) {
                try {
                    const raw = localStorage.getItem(DATA_KEY);
                    if (raw)
                        legacy = JSON.parse(raw);
                }
                catch { }
            }
            data = normalizeData(legacy || {});
            if (legacy) {
                await dbWrite(data);
                LEGACY_KEYS.forEach(k => {
                    try {
                        localStorage.removeItem(k);
                    }
                    catch { }
                });
                showToast('Your previous CarSpotter data has been brought into the new version.');
            }
        }
        catch (err) {
            console.error(err);
            db = null;
            dbMode = 'localstorage';
            try {
                let saved = null;
                for (const key of LEGACY_KEYS) {
                    try {
                        const raw = localStorage.getItem(key);
                        if (raw) {
                            saved = JSON.parse(raw);
                            break;
                        }
                    }
                    catch { }
                }
                if (!saved) {
                    try {
                        const raw = localStorage.getItem(DATA_KEY);
                        if (raw)
                            saved = JSON.parse(raw);
                    }
                    catch { }
                }
                data = normalizeData(saved || {});
            }
            catch {
                data = { spots: [], runs: [], activeRunId: null, homeHeroPhoto: '' };
            }
            showToast('Using basic browser storage. Export backups often, especially when saving photos.');
        }
    }
    function persist() {
        const snapshot = clone(data);
        persistChain = persistChain.catch(() => { }).then(async () => {
            if (dbMode === 'indexeddb' && db) {
                await dbWrite(snapshot);
            }
            else {
                localStorage.setItem(DATA_KEY, JSON.stringify(snapshot));
            }
        });
        return persistChain.catch(err => { console.error(err); showToast('Could not save. Export a backup and free browser storage space.'); throw err; });
    }
    function vehicleFieldId(prefix, key) {
        if (!prefix)
            return key;
        return prefix + key.charAt(0).toUpperCase() + key.slice(1);
    }
    function vehicleField(prefix, key) { return getElement(vehicleFieldId(prefix, key)); }
    function datalistId(prefix, key) { const cap = key.charAt(0).toUpperCase() + key.slice(1); return prefix ? `${prefix}${cap}Options` : `${key}Options`; }
    function fillDatalist(listId, values) {
        const list = getElement(listId);
        if (!list)
            return;
        list.replaceChildren(...[...new Set(values)].filter(Boolean).map(value => {
            const option = document.createElement('option');
            option.value = value;
            return option;
        }));
    }
    function updateTrimOptions(prefix, preferredTrim) {
        const make = vehicleField(prefix, 'makeSelect').value.trim();
        const model = vehicleField(prefix, 'modelSelect').value.trim();
        const trim = vehicleField(prefix, 'trimSelect');
        const options = (submodelCatalog[make] && submodelCatalog[make][model]) || [];
        fillDatalist(datalistId(prefix, 'trim'), options);
        if (preferredTrim !== undefined)
            trim.value = preferredTrim || '';
        return options;
    }
    function updateModelOptions(prefix) {
        const make = vehicleField(prefix, 'makeSelect').value.trim();
        const model = vehicleField(prefix, 'modelSelect');
        fillDatalist(datalistId(prefix, 'model'), modelCatalog[make] || []);
        model.disabled = !make;
    }
    function populateVehicle(prefix) {
        const make = vehicleField(prefix, 'makeSelect'), model = vehicleField(prefix, 'modelSelect'), trim = vehicleField(prefix, 'trimSelect');
        fillDatalist(datalistId(prefix, 'make'), makes);
        fillDatalist(datalistId(prefix, 'model'), []);
        fillDatalist(datalistId(prefix, 'trim'), []);
        model.disabled = true;
        make.dataset.lastValue = '';
        model.dataset.lastValue = '';
        const syncMake = () => {
            const value = make.value.trim();
            if (value !== make.dataset.lastValue) {
                model.value = '';
                trim.value = '';
                model.dataset.lastValue = '';
                make.dataset.lastValue = value;
            }
            updateModelOptions(prefix);
            updateTrimOptions(prefix, '');
            if (prefix === '')
                updateSpotProgress();
        };
        const syncModel = () => {
            const value = model.value.trim();
            if (value !== model.dataset.lastValue) {
                trim.value = '';
                model.dataset.lastValue = value;
            }
            updateTrimOptions(prefix);
            if (prefix === '')
                updateSpotProgress();
        };
        make.addEventListener('input', syncMake);
        make.addEventListener('change', syncMake);
        model.addEventListener('input', syncModel);
        model.addEventListener('change', syncModel);
        trim.addEventListener('input', () => {
            if (prefix === '')
                updateSpotProgress();
        });
        trim.addEventListener('change', () => {
            if (prefix === '')
                updateSpotProgress();
        });
    }
    function setVehicleFields(prefix, spot) {
        const make = vehicleField(prefix, 'makeSelect'), model = vehicleField(prefix, 'modelSelect'), trim = vehicleField(prefix, 'trimSelect');
        make.value = spot.make || '';
        make.dataset.lastValue = make.value.trim();
        updateModelOptions(prefix);
        model.value = spot.model || '';
        model.dataset.lastValue = model.value.trim();
        updateTrimOptions(prefix, spot.trim || '');
    }
    function readVehicleFields(prefix) {
        return { make: vehicleField(prefix, 'makeSelect').value.trim(), model: vehicleField(prefix, 'modelSelect').value.trim(), trim: vehicleField(prefix, 'trimSelect').value.trim() };
    }
    function populateChoiceLists() {
        const latest = Math.min(2099, new Date().getFullYear() + 2);
        const years = [];
        for (let y = latest; y >= 1886; y--)
            years.push(String(y));
        const colors = ['Black', 'White', 'Pearl White', 'Ivory', 'Cream', 'Silver', 'Platinum Silver', 'Gray', 'Charcoal', 'Nardo Gray', 'Chalk', 'Aventurine Green', 'Blue', 'Navy Blue', 'Miami Blue', 'Racing Blue', 'Light Blue', 'Red', 'Guards Red', 'Rosso Corsa', 'Soul Red Crystal', 'Burgundy', 'Orange', 'Papaya Orange', 'Yellow', 'Giallo Modena', 'Green', 'British Racing Green', 'Lime Green', 'Purple', 'Brown', 'Bronze', 'Gold', 'Champagne', 'Beige', 'Tan', 'Copper', 'Two-tone', 'Other'];
        ['yearOptions', 'editYearOptions'].forEach(id => fillDatalist(id, years));
        ['colorOptions', 'editColorOptions'].forEach(id => fillDatalist(id, colors));
    }
    populateVehicle('');
    populateVehicle('edit');
    populateChoiceLists();
    function setupSearchSuggestions() {
        const syncMobileDropdownNav = () => {
            const isMobile = window.matchMedia ? window.matchMedia('(max-width: 850px)').matches : window.innerWidth <= 850;
            const hasOpenMenu = !!document.querySelector('#spotForm .autocomplete-wrap.is-open');
            document.body.classList.toggle('dropdown-active', isMobile && hasOpenMenu);
        };
        document.querySelectorAll('#spotForm .searchable-control[list]').forEach((input, index) => {
            const listId = input.getAttribute('list');
            const list = getElement(listId);
            if (!list || input.dataset.suggestionsReady === 'true')
                return;
            input.dataset.suggestionsReady = 'true';
            input.dataset.suggestionListId = listId;
            input.removeAttribute('list');
            const wrap = document.createElement('div');
            wrap.className = 'autocomplete-wrap';
            input.parentNode.insertBefore(wrap, input);
            wrap.appendChild(input);
            const label = document.querySelector('label[for="' + input.id + '"]');
            if (label) {
                const hint = document.createElement('span');
                hint.className = 'field-mode-hint';
                hint.textContent = 'TYPE OR PICK';
                label.appendChild(hint);
            }
            const toggle = document.createElement('button');
            toggle.type = 'button';
            toggle.className = 'autocomplete-toggle';
            toggle.setAttribute('aria-label', 'Show suggestions');
            toggle.setAttribute('aria-expanded', 'false');
            toggle.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>';
            wrap.appendChild(toggle);
            const menu = document.createElement('div');
            menu.className = 'autocomplete-menu';
            menu.id = 'suggestions-' + input.id;
            menu.setAttribute('role', 'listbox');
            menu.setAttribute('aria-label', 'Suggestions');
            wrap.appendChild(menu);
            function positionCoachPortalMenu() {
                const coachLayer = document.getElementById('coachLayer');
                if (!coachLayer || coachLayer.hidden || menu.parentElement !== coachLayer)
                    return;
                const anchor = wrap.getBoundingClientRect();
                const gap = 7;
                const below = Math.max(0, window.innerHeight - anchor.bottom - gap - 8);
                const above = Math.max(0, anchor.top - gap - 8);
                const useBelow = below >= above || below >= 150;
                const available = Math.max(110, Math.max(below, above));
                const maxHeight = Math.max(110, Math.min(330, Math.floor(window.innerHeight * 0.42), Math.floor(available)));
                menu.style.position = 'fixed';
                menu.style.display = 'block';
                menu.style.left = `${Math.max(12, Math.min(anchor.left, window.innerWidth - Math.min(anchor.width, window.innerWidth - 24) - 12))}px`;
                menu.style.right = 'auto';
                menu.style.width = `${Math.min(anchor.width, window.innerWidth - 24)}px`;
                menu.style.maxHeight = `${maxHeight}px`;
                menu.style.zIndex = '4';
                menu.style.pointerEvents = 'auto';
                const desiredHeight = Math.min(menu.scrollHeight || 180, maxHeight);
                const top = useBelow
                    ? Math.min(window.innerHeight - desiredHeight - 8, anchor.bottom + gap)
                    : Math.max(8, anchor.top - desiredHeight - gap);
                menu.style.top = `${top}px`;
                menu.style.bottom = 'auto';
            }
            function portalCoachMenuIfNeeded() {
                const coachLayer = document.getElementById('coachLayer');
                if (!coachLayer || coachLayer.hidden)
                    return false;
                if (menu.parentElement !== coachLayer)
                    coachLayer.appendChild(menu);
                menu.dataset.coachDropdownFor = input.id;
                positionCoachPortalMenu();
                return true;
            }
            function restoreCoachPortalMenu() {
                if (menu.parentElement !== wrap)
                    wrap.appendChild(menu);
                delete menu.dataset.coachDropdownFor;
                menu.style.cssText = '';
            }
            input.setAttribute('aria-autocomplete', 'list');
            input.setAttribute('aria-controls', menu.id);
            input.setAttribute('aria-expanded', 'false');
            let values = [];
            let activeIndex = -1;
            let touchingMenu = false;
            let touchReleaseTimer = null;
            let suppressFocusOpen = false;
            let pendingTouchOption = null;
            let suppressSyntheticClickUntil = 0;
            menu.addEventListener('touchstart', () => {
                touchingMenu = true;
                if (touchReleaseTimer)
                    clearTimeout(touchReleaseTimer);
            }, { passive: true });
            menu.addEventListener('touchend', () => {
                if (touchReleaseTimer)
                    clearTimeout(touchReleaseTimer);
                touchReleaseTimer = setTimeout(() => { touchingMenu = false; }, 500);
            }, { passive: true });
            menu.addEventListener('touchcancel', () => {
                if (touchReleaseTimer)
                    clearTimeout(touchReleaseTimer);
                touchReleaseTimer = setTimeout(() => { touchingMenu = false; }, 500);
            }, { passive: true });
            menu.addEventListener('pointerdown', event => {
                const option = event.target.closest?.('.autocomplete-option');
                if (!option || !menu.contains(option) || event.isPrimary === false || event.pointerType === 'mouse') {
                    pendingTouchOption = null;
                    return;
                }
                pendingTouchOption = { option, x: event.clientX, y: event.clientY, pointerId: event.pointerId };
            }, { passive: true });
            menu.addEventListener('pointerup', event => {
                const pending = pendingTouchOption;
                pendingTouchOption = null;
                if (!pending || event.pointerId !== pending.pointerId || !pending.option.isConnected)
                    return;
                const sameOption = event.target.closest?.('.autocomplete-option') === pending.option;
                const moved = Math.hypot(event.clientX - pending.x, event.clientY - pending.y);
                if (!sameOption || moved > 12)
                    return;
                const value = pending.option.dataset.value;
                if (!value)
                    return;
                suppressSyntheticClickUntil = performance.now() + 900;
                choose(value);
            }, { passive: true });
            menu.addEventListener('pointercancel', () => { pendingTouchOption = null; }, { passive: true });
            const optionValues = () => {
                const source = getElement(input.dataset.suggestionListId);
                return source ? Array.from(source.options).map(o => o.value).filter((v, i, a) => v && a.indexOf(v) === i) : [];
            };
            const currentMatches = () => {
                const term = input.value.trim().toLocaleLowerCase();
                const all = optionValues();
                if (!term)
                    return all;
                return all.filter(v => v.toLocaleLowerCase().includes(term)).sort((a, b) => {
                    const aa = a.toLocaleLowerCase(), bb = b.toLocaleLowerCase();
                    return Number(!aa.startsWith(term)) - Number(!bb.startsWith(term));
                });
            };
            const setOpen = (open) => {
                if (open && input.disabled)
                    open = false;
                wrap.classList.toggle('is-open', open);
                toggle.setAttribute('aria-expanded', String(open));
                input.setAttribute('aria-expanded', String(open));
                syncMobileDropdownNav();
                if (open) {
                    portalCoachMenuIfNeeded();
                    render();
                    if (menu.parentElement === document.getElementById('coachLayer'))
                        positionCoachPortalMenu();
                }
                else {
                    activeIndex = -1;
                    input.removeAttribute('aria-activedescendant');
                    restoreCoachPortalMenu();
                }
            };
            function render() {
                values = currentMatches();
                activeIndex = -1;
                menu.replaceChildren();
                if (!values.length) {
                    const empty = document.createElement('div');
                    empty.className = 'autocomplete-empty';
                    empty.innerHTML = '<strong>No matching suggestions</strong><span>Keep typing — custom entries are accepted.</span>';
                    menu.appendChild(empty);
                }
                else {
                    const heading = document.createElement('div');
                    heading.className = 'autocomplete-menu-heading';
                    heading.textContent = input.value.trim() ? 'MATCHING SUGGESTIONS' : 'POPULAR CHOICES';
                    menu.appendChild(heading);
                    values.forEach((value, i) => {
                        const option = document.createElement('button');
                        option.type = 'button';
                        option.className = 'autocomplete-option';
                        option.setAttribute('role', 'option');
                        option.setAttribute('aria-selected', 'false');
                        option.dataset.index = String(i);
                        option.dataset.value = value;
                        const text = document.createElement('span');
                        text.textContent = value;
                        const marker = document.createElement('span');
                        marker.className = 'autocomplete-option-mark';
                        marker.textContent = '↵';
                        option.append(text, marker);
                        option.addEventListener('click', event => {
                            if (event.detail > 0 && performance.now() < suppressSyntheticClickUntil) {
                                event.preventDefault();
                                return;
                            }
                            choose(value, true);
                        });
                        menu.appendChild(option);
                    });
                    const foot = document.createElement('div');
                    foot.className = 'autocomplete-menu-foot';
                    foot.textContent = 'Tap a choice or keep typing';
                    menu.appendChild(foot);
                }
                if (menu.parentElement === document.getElementById('coachLayer'))
                    positionCoachPortalMenu();
            }
            function choose(value, restoreFocus = false) {
                input.value = value;
                input.dispatchEvent(new Event('input', { bubbles: true }));
                input.dispatchEvent(new Event('change', { bubbles: true }));
                setOpen(false);
                input.dispatchEvent(new CustomEvent('carspotter:suggestion-selected', { bubbles: true, detail: { value } }));
                if (restoreFocus) {
                    suppressFocusOpen = true;
                    try {
                        input.focus({ preventScroll: true });
                    }
                    catch {
                        input.focus();
                    }
                    suppressFocusOpen = false;
                }
            }
            function moveActive(direction) {
                if (!wrap.classList.contains('is-open'))
                    setOpen(true);
                const buttons = Array.from(menu.querySelectorAll('.autocomplete-option'));
                if (!buttons.length)
                    return;
                activeIndex = Math.max(0, Math.min(buttons.length - 1, activeIndex + direction));
                buttons.forEach((button, i) => {
                    const active = i === activeIndex;
                    button.classList.toggle('is-active', active);
                    button.setAttribute('aria-selected', String(active));
                });
                input.setAttribute('aria-activedescendant', buttons[activeIndex].id || (buttons[activeIndex].id = 'suggestion-' + input.id + '-' + activeIndex));
                buttons[activeIndex].scrollIntoView({ block: 'nearest' });
            }
            input.addEventListener('focus', () => {
                if (!suppressFocusOpen)
                    setOpen(true);
            });
            input.addEventListener('click', () => {
                if (!wrap.classList.contains('is-open'))
                    setOpen(true);
            });
            input.addEventListener('input', () => {
                if (wrap.classList.contains('is-open'))
                    render();
            });
            input.addEventListener('keydown', event => {
                if (event.key === 'ArrowDown') {
                    event.preventDefault();
                    moveActive(1);
                }
                else if (event.key === 'ArrowUp') {
                    event.preventDefault();
                    moveActive(-1);
                }
                else if (event.key === 'Escape') {
                    setOpen(false);
                }
                else if (event.key === 'Enter' && wrap.classList.contains('is-open') && activeIndex >= 0 && values[activeIndex]) {
                    event.preventDefault();
                    choose(values[activeIndex]);
                }
            });
            input.addEventListener('blur', () => {
                setTimeout(() => {
                    if (!touchingMenu && !wrap.contains(document.activeElement))
                        setOpen(false);
                }, 360);
            });
            toggle.addEventListener('mousedown', event => event.preventDefault());
            toggle.addEventListener('click', () => {
                const wasFocused = document.activeElement === input;
                if (!wasFocused) {
                    input.focus({ preventScroll: true });
                    setOpen(true);
                }
                else
                    setOpen(!wrap.classList.contains('is-open'));
            });
            const syncDisabled = () => {
                toggle.disabled = input.disabled;
                toggle.setAttribute('aria-label', input.disabled ? 'Choose a make first' : 'Show suggestions');
                if (input.disabled)
                    setOpen(false);
            };
            new MutationObserver(syncDisabled).observe(input, { attributes: true, attributeFilter: ['disabled'] });
            syncDisabled();
        });
        document.addEventListener('pointerdown', event => {
            document.querySelectorAll('#spotForm .autocomplete-wrap.is-open').forEach(w => {
                const field = w.querySelector('.searchable-control');
                const portalMenu = field
                    ? document.querySelector(`#coachLayer .autocomplete-menu[data-coach-dropdown-for="${field.id}"]`)
                    : null;
                if (!w.contains(event.target) && !portalMenu?.contains(event.target)) {
                    w.classList.remove('is-open');
                    if (portalMenu) {
                        w.appendChild(portalMenu);
                        delete portalMenu.dataset.coachDropdownFor;
                        portalMenu.style.cssText = '';
                    }
                    if (field) {
                        field.setAttribute('aria-expanded', 'false');
                        field.removeAttribute('aria-activedescendant');
                    }
                    const button = w.querySelector('.autocomplete-toggle');
                    if (button)
                        button.setAttribute('aria-expanded', 'false');
                }
            });
            syncMobileDropdownNav();
        });
        window.addEventListener('resize', syncMobileDropdownNav, { passive: true });
    }
    setupSearchSuggestions();
    (function lockMobilePageZoom() {
        const preventGestureZoom = event => event.preventDefault();
        const preventMultiTouchZoom = event => {
            if (event.touches && event.touches.length > 1)
                event.preventDefault();
        };
        ['gesturestart', 'gesturechange', 'gestureend'].forEach(type => {
            document.addEventListener(type, preventGestureZoom, { passive: false });
        });
        document.addEventListener('touchstart', preventMultiTouchZoom, { passive: false });
        document.addEventListener('touchmove', preventMultiTouchZoom, { passive: false });
    })();
    function updateSpotProgress() {
        const vehicle = readVehicleFields('');
        const carReady = !!(vehicle.make.trim() && vehicle.model.trim());
        const photoReady = !!currentPhoto || getElement('photoDrop').classList.contains('no-photo');
        const locationReady = !!currentLocation;
        const states = { car: carReady, photo: photoReady, location: locationReady };
        getElement('spotForm').classList.toggle('ready-to-save', carReady);
        if ((vehicle.make || vehicle.model) && !getElement('spotSuccessNote').hidden) {
            getElement('spotSuccessNote').hidden = true;
            getElement('spotSuccessNote').classList.remove('is-celebrating');
        }
        document.querySelectorAll('[data-progress-step]').forEach(step => {
            const done = !!states[step.dataset.progressStep];
            step.classList.toggle('complete', done);
            const number = step.querySelector('[data-step-number]');
            if (number)
                number.textContent = done ? '✓' : number.dataset.stepNumber;
            step.setAttribute('aria-label', `${step.textContent.trim()}${done ? ' complete' : ''}`);
        });
    }
    ['makeSelect', 'modelSelect', 'trimSelect'].forEach(key => {
        const field = getElement(key);
        if (field) {
            field.addEventListener('change', updateSpotProgress);
            field.addEventListener('input', updateSpotProgress);
        }
    });
    function animateHomeNumber(el, value) {
        if (!el)
            return;
        const target = Math.max(0, Number(value) || 0), previous = Number(el.dataset.countValue || 0);
        if (el._countAnimation)
            cancelAnimationFrame(el._countAnimation);
        el.dataset.countValue = String(target);
        if (target === previous || document.body.classList.contains('reduce-motion') || target < previous) {
            el.textContent = String(target);
            return;
        }
        const duration = 520, start = performance.now();
        const tick = now => {
            const t = Math.min(1, (now - start) / duration), eased = 1 - Math.pow(1 - t, 3);
            el.textContent = String(Math.round(previous + (target - previous) * eased));
            if (t < 1)
                el._countAnimation = requestAnimationFrame(tick);
            else
                el._countAnimation = null;
        };
        el._countAnimation = requestAnimationFrame(tick);
    }
    function collectionProgress(total) {
        const levels = [1, 5, 10, 25, 50, 100, 250, 500];
        const unlocked = levels.includes(total) ? total : null;
        const previous = unlocked === 1 ? 0 : (unlocked ?? ([...levels].reverse().find(n => n < total) ?? 0));
        const next = levels.find(n => n > total) ?? (Math.floor(total / 100) * 100 + 100);
        const ratio = Math.max(0, Math.min(100, ((total - previous) / (next - previous)) * 100));
        const left = next - total;
        const label = unlocked === 1 ? `FIRST SPOT SAVED · ${left} TO ${next}` : unlocked ? `${unlocked}-SPOT MILESTONE · ${left} TO ${next}` : `${left} MORE ${left === 1 ? 'SPOT' : 'SPOTS'} TO ${next}`;
        return { ratio, label, unlocked, next };
    }
    let activeRevealResolve = null, activeRevealSkip = null;
    const revealDelay = ms => new Promise(resolve => setTimeout(resolve, ms));
    function showSpotReveal(spot, total, progress) {
        return new Promise(resolve => {
            const overlay = getElement('spotReveal'), rarity = estimateRarity(spot);
            const appReduced = document.body.classList.contains('reduce-motion');
            const systemReduced = window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
            const gentleMotion = appReduced || systemReduced;
            const raritySteps = ['common', 'uncommon', 'rare', 'epic', 'legendary', 'cosmic'].slice(0, rarity.rank);
            let finished = false, skipped = false;
            getElement('spotRevealMake').textContent = (spot.make || '').toUpperCase();
            getElement('spotRevealModel').textContent = `${spot.year ? spot.year + ' ' : ''}${spot.model || ''}`;
            getElement('spotRevealTrim').textContent = spot.trim || spot.color || 'A new addition to your sightings';
            getElement('spotRevealRarity').textContent = rarity.label.toUpperCase();
            getElement('spotRevealRarity').title = rarity.reason;
            getElement('spotRevealRarity').setAttribute('aria-label', `You got ${rarity.label} rarity`);
            getElement('spotRevealCountLabel').textContent = progress.unlocked ? `${progress.unlocked}-SPOT MILESTONE` : `COLLECTION ENTRY #${String(total).padStart(3, '0')}`;
            getElement('spotRevealCollectionLabel').textContent = progress.label;
            getElement('spotRevealMonogram').textContent = `${(spot.make || 'C').slice(0, 1)}${(spot.model || 'S').slice(0, 1)}`.toUpperCase();
            const photo = getElement('spotRevealPhoto'), empty = getElement('spotRevealNoPhoto');
            photo.onerror = () => { photo.hidden = true; empty.hidden = false; };
            if (spot.photo) {
                photo.src = spot.photo;
                photo.hidden = false;
                empty.hidden = true;
            }
            else {
                photo.removeAttribute('src');
                photo.hidden = true;
                empty.hidden = false;
            }
            overlay.dataset.rarity = rarity.key;
            overlay.dataset.currentRarity = 'base';
            overlay.classList.toggle('gentle-motion', gentleMotion);
            overlay.classList.remove('is-active', 'stage-scan', 'stage-launch', 'stage-slam', 'stage-reveal', 'stage-complete', 'stage-confetti', 'impact-flash', 'is-special', 'is-elite', 'is-legendary', 'is-cosmic');
            const confetti = overlay.querySelector('.reveal-confetti');
            if (confetti)
                confetti.replaceChildren();
            getElement('spotRevealCount').textContent = '0';
            getElement('spotRevealCountUnit').textContent = total === 1 ? 'CAR' : 'CARS';
            getElement('spotRevealSkip').hidden = false;
            overlay.hidden = false;
            overlay.setAttribute('aria-hidden', 'false');
            document.body.classList.add('spot-reveal-open');
            void overlay.offsetWidth;
            requestAnimationFrame(() => overlay.classList.add('is-active'));
            const showFinalRarity = () => {
                overlay.dataset.currentRarity = rarity.key;
                if (rarity.rank >= 3)
                    overlay.classList.add('is-special');
                if (rarity.rank >= 4)
                    overlay.classList.add('is-elite');
                if (rarity.rank >= 5)
                    overlay.classList.add('is-legendary');
                if (rarity.rank >= 6)
                    overlay.classList.add('is-cosmic');
            };
            const finishVisual = () => {
                overlay.classList.remove('stage-launch', 'stage-slam', 'impact-flash');
                showFinalRarity();
                overlay.classList.add('stage-scan', 'stage-reveal', 'stage-complete');
                getElement('spotRevealStatus').textContent = 'SIGHTING SAVED';
                getElement('spotRevealCount').textContent = String(total);
                getElement('spotRevealSkip').hidden = true;
                const actions = overlay.querySelector('.reveal-actions');
                actions.setAttribute('aria-label', 'Sighting saved. Choose what to do next.');
            };
            activeRevealSkip = () => { skipped = true; finishVisual(); };
            const finish = action => {
                if (finished)
                    return;
                finished = true;
                activeRevealSkip = null;
                activeRevealResolve = null;
                overlay.classList.remove('is-active');
                overlay.setAttribute('aria-hidden', 'true');
                setTimeout(() => {
                    overlay.hidden = true;
                    overlay.classList.remove('gentle-motion', 'stage-confetti', 'is-special', 'is-elite', 'is-legendary', 'is-cosmic', 'impact-flash');
                    overlay.dataset.currentRarity = 'base';
                    if (confetti)
                        confetti.replaceChildren();
                    document.body.classList.remove('spot-reveal-open');
                }, 320);
                resolve(action);
            };
            activeRevealResolve = finish;
            const applyRarityStep = async (index) => {
                if (skipped)
                    return;
                const key = raritySteps[index];
                overlay.dataset.currentRarity = key;
                if (index >= 2)
                    overlay.classList.add('is-special');
                if (index >= 3)
                    overlay.classList.add('is-elite');
                if (index >= 4)
                    overlay.classList.add('is-legendary');
                if (index >= 5)
                    overlay.classList.add('is-cosmic');
                if (!gentleMotion) {
                    overlay.classList.remove('impact-flash');
                    void overlay.offsetWidth;
                    overlay.classList.add('impact-flash');
                }
                await revealDelay(gentleMotion ? 330 : 500);
                overlay.classList.remove('impact-flash');
            };
            const launchRarityConfetti = () => {
                if (gentleMotion || rarity.rank < 3 || !confetti)
                    return;
                const count = rarity.rank === 3 ? 9 : rarity.rank === 4 ? 17 : rarity.rank === 5 ? 28 : 48;
                const colors = { common: '#c3ccd8', uncommon: '#55e0ae', rare: '#70b8ff', epic: '#ca91ff', legendary: '#ffdc78', cosmic: '#d66cff' };
                const rainbow = ['#ff4d6d', '#ffad45', '#ffe45e', '#50d890', '#4ea5ff', '#9b6dff', '#ff66c4'];
                const palette = rarity.key === 'cosmic' ? rainbow : [colors[rarity.key], '#ffffff', colors[rarity.key]];
                const fragment = document.createDocumentFragment();
                for (let i = 0; i < count; i++) {
                    const bit = document.createElement('i');
                    const angle = (Math.PI * 2 * i) / count + (Math.random() - .5) * .42;
                    const distance = (rarity.rank >= 6 ? 185 : rarity.rank === 5 ? 130 : rarity.rank === 4 ? 105 : 82) + Math.random() * 65;
                    bit.style.setProperty('--dx', `${Math.cos(angle) * distance | 0}px`);
                    bit.style.setProperty('--dy', `${Math.sin(angle) * distance + 70 | 0}px`);
                    bit.style.setProperty('--spin', `${Math.round((Math.random() > .5 ? 1 : -1) * (240 + Math.random() * 540))}deg`);
                    bit.style.setProperty('--w', `${5 + Math.random() * 5}px`);
                    bit.style.setProperty('--duration', `${1.25 + Math.random() * .8}s`);
                    bit.style.setProperty('--delay', `${Math.random() * .18}s`);
                    bit.style.setProperty('--confetti-color', palette[i % palette.length]);
                    fragment.appendChild(bit);
                }
                confetti.replaceChildren(fragment);
                overlay.classList.add('stage-confetti');
            };
            const runAnimation = async () => {
                getElement('spotRevealStatus').textContent = 'GETTING YOUR PHOTO READY';
                await revealDelay(260);
                if (skipped)
                    return;
                overlay.classList.add('stage-scan');
                getElement('spotRevealStatus').textContent = 'PHOTO INCOMING';
                await revealDelay(220);
                if (skipped)
                    return;
                overlay.classList.add('stage-launch');
                await revealDelay(gentleMotion ? 900 : 1320);
                if (skipped)
                    return;
                overlay.classList.remove('stage-launch');
                overlay.classList.add('stage-slam');
                getElement('spotRevealStatus').textContent = 'LOCKING IN YOUR SIGHTING';
                if (navigator.vibrate && !gentleMotion) {
                    try {
                        navigator.vibrate([18, 28, 24]);
                    }
                    catch { }
                }
                await applyRarityStep(0);
                if (skipped)
                    return;
                overlay.classList.remove('stage-slam');
                overlay.classList.add('stage-reveal');
                getElement('spotRevealStatus').textContent = 'SAVED TO YOUR GARAGE';
                for (let i = 1; i < raritySteps.length; i++) {
                    if (skipped)
                        return;
                    if (i >= 3) {
                        await revealDelay(gentleMotion ? 90 : (i === 5 ? 360 : i === 4 ? 260 : 160));
                        if (skipped)
                            return;
                    }
                    await applyRarityStep(i);
                }
                await revealDelay(gentleMotion ? 130 : 260);
                if (skipped)
                    return;
                getElement('spotRevealCount').textContent = String(total);
                overlay.classList.add('stage-complete');
                launchRarityConfetti();
                getElement('spotRevealSkip').hidden = true;
            };
            runAnimation().catch(err => { console.error('Reveal animation failed:', err); finishVisual(); });
        });
    }
    getElement('spotRevealSkip').addEventListener('click', () => activeRevealSkip?.());
    getElement('spotRevealAnother').addEventListener('click', () => activeRevealResolve?.('another'));
    getElement('spotRevealView').addEventListener('click', () => activeRevealResolve?.('view'));
    function activeRun() { return data.runs.find(r => r.id === data.activeRunId && !r.endedAt) || null; }
    function spotsForRun(runId) { return data.spots.filter(s => s.runId === runId); }
    function updateSpotRunNotice() { const run = activeRun(); getElement('activeRunNotice').classList.toggle('show', !!run); getElement('activeRunName').textContent = run ? run.name : ''; }
    async function compressPhoto(file, maxDimension = 1600, quality = .78) {
        if (!file || !file.type.startsWith('image/'))
            throw new Error('Choose an image file.');
        if (file.size > 35 * 1024 * 1024)
            throw new Error('That image is over 35 MB. Choose a smaller photo.');
        const url = URL.createObjectURL(file);
        try {
            const image = new Image();
            image.src = url;
            await new Promise((resolve, reject) => { image.onload = resolve; image.onerror = () => reject(new Error('This image format could not be opened by this browser.')); });
            const scale = Math.min(1, maxDimension / Math.max(image.naturalWidth, image.naturalHeight));
            const canvas = document.createElement('canvas');
            canvas.width = Math.max(1, Math.round(image.naturalWidth * scale));
            canvas.height = Math.max(1, Math.round(image.naturalHeight * scale));
            const ctx = canvas.getContext('2d', { alpha: false });
            if (!ctx)
                throw new Error('Photo processing is not available in this browser.');
            ctx.fillStyle = '#fff';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
            return canvas.toDataURL('image/jpeg', quality);
        }
        finally {
            URL.revokeObjectURL(url);
        }
    }
    function photoSize(dataUrl) { return Math.max(0, Math.round((dataUrl.length * 3) / 4)); }
    async function setSelectedPhoto(file) {
        getElement('photoStatus').textContent = 'Preparing photo…';
        getElement('saveSpotButton').disabled = true;
        try {
            const compressed = await compressPhoto(file);
            currentPhoto = compressed;
            getElement('photoPreview').src = compressed;
            getElement('photoDrop').classList.remove('no-photo');
            getElement('photoDrop').classList.add('has-photo');
            getElement('photoStatus').textContent = `Ready · ${bytesLabel(photoSize(compressed))}`;
            updateSpotProgress();
        }
        catch (err) {
            showToast(err.message || 'Could not prepare this photo.');
            getElement('photoStatus').textContent = 'No photo selected';
            currentPhoto = '';
            getElement('photoDrop').classList.remove('has-photo', 'no-photo');
            updateSpotProgress();
        }
        finally {
            getElement('saveSpotButton').disabled = false;
        }
    }
    let photoPickerPurpose = 'spot';
    function openPhotoSource(purpose) {
        photoPickerPurpose = purpose;
        const copy = { spot: 'Add a picture of the car you spotted.', edit: 'Choose a replacement picture for this sighting.', hero: 'Choose a photo to replace the car-and-moon artwork on your home page.' };
        getElement('photoSourceCopy').textContent = copy[purpose] || 'Choose where your picture should come from.';
        showModal('photoSourceModal');
        if (activeCoachTour?.name === 'spot' && !getElement('coachLayer').hidden)
            getElement('photoSourceModal').style.zIndex = '16020';
    }
    function choosePhotoSource(source) {
        const input = getElement('photo' + (source === 'camera' ? 'Camera' : 'Library') + 'Input');
        input.value = '';
        hideModal('photoSourceModal');
        input.click();
    }
    getElement('choosePhotoLibrary').addEventListener('click', () => choosePhotoSource('library'));
    getElement('choosePhotoCamera').addEventListener('click', () => choosePhotoSource('camera'));
    async function handlePickedPhoto(file) {
        if (!file)
            return;
        const purpose = photoPickerPurpose;
        if (purpose === 'spot') {
            await setSelectedPhoto(file);
            return;
        }
        if (purpose === 'edit') {
            getElement('editPhotoStatus').textContent = 'Preparing…';
            try {
                editPhoto = await compressPhoto(file);
                getElement('editPhotoPreview').src = editPhoto;
                getElement('editPhotoStatus').textContent = `New photo · ${bytesLabel(photoSize(editPhoto))}`;
            }
            catch (err) {
                editPhoto = '';
                getElement('editPhotoStatus').textContent = 'Could not use this photo';
                showToast(err.message || 'Could not use this photo.');
            }
            return;
        }
        if (purpose === 'hero') {
            const previous = data.homeHeroPhoto || '';
            getElement('homeHeroChangePhoto').disabled = true;
            getElement('homeHeroChangePhoto').textContent = 'PREPARING…';
            try {
                const compressed = await compressPhoto(file, 1440, .76);
                data.homeHeroPhoto = compressed;
                await persist();
                renderHomeHero();
                showToast('Home page photo updated.');
            }
            catch (err) {
                data.homeHeroPhoto = previous;
                renderHomeHero();
                showToast(err.message || 'Could not save the home page photo.');
            }
            finally {
                getElement('homeHeroChangePhoto').disabled = false;
            }
        }
    }
    ['photoLibraryInput', 'photoCameraInput'].forEach(inputId => getElement(inputId).addEventListener('change', e => {
        const file = e.target.files?.[0];
        if (file)
            handlePickedPhoto(file);
        e.target.value = '';
    }));
    getElement('addPhotoButton').addEventListener('click', () => openPhotoSource('spot'));
    getElement('changeSpotPhotoButton').addEventListener('click', () => openPhotoSource('spot'));
    getElement('homeHeroChangePhoto').addEventListener('click', () => openPhotoSource('hero'));
    getElement('homeHeroResetPhoto').addEventListener('click', async () => {
        const previous = data.homeHeroPhoto || '';
        data.homeHeroPhoto = '';
        try {
            await persist();
            renderHomeHero();
            showToast('Original car-and-moon artwork restored.');
        }
        catch (err) {
            data.homeHeroPhoto = previous;
            renderHomeHero();
        }
    });
    getElement('editChangePhoto').addEventListener('click', () => openPhotoSource('edit'));
    getElement('photoDrop').addEventListener('dragover', e => { e.preventDefault(); getElement('photoDrop').classList.add('dragover'); });
    getElement('photoDrop').addEventListener('dragleave', () => getElement('photoDrop').classList.remove('dragover'));
    getElement('photoDrop').addEventListener('drop', e => {
        e.preventDefault();
        getElement('photoDrop').classList.remove('dragover');
        const file = e.dataTransfer?.files?.[0];
        if (file)
            setSelectedPhoto(file);
    });
    getElement('removePhoto').addEventListener('click', () => { currentPhoto = ''; getElement('photoLibraryInput').value = ''; getElement('photoCameraInput').value = ''; getElement('photoPreview').removeAttribute('src'); getElement('photoDrop').classList.remove('has-photo', 'no-photo'); getElement('photoStatus').textContent = 'No photo selected'; updateSpotProgress(); });
    getElement('noPhotoButton').addEventListener('click', () => { currentPhoto = ''; getElement('photoLibraryInput').value = ''; getElement('photoCameraInput').value = ''; getElement('photoPreview').removeAttribute('src'); getElement('photoDrop').classList.remove('has-photo'); getElement('photoDrop').classList.add('no-photo'); getElement('photoStatus').textContent = 'Saving without a photo'; updateSpotProgress(); });
    getElement('notesInput').addEventListener('input', () => { getElement('notesCounter').textContent = `${getElement('notesInput').value.length} / 280`; });
    updateSpotProgress();
    function initSpotMap() {
        if (!window.L) {
            getElement('spotMap').innerHTML = '<div class="map-message"><div><strong>Map unavailable</strong>Connect to the internet and reload to use the map. GPS may still work.</div></div>';
            return null;
        }
        if (!spotMap) {
            getElement('spotMap').innerHTML = '';
            spotMap = L.map('spotMap', { zoomControl: true, scrollWheelZoom: false }).setView([39.5, -98.35], 4);
            L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 19, attribution: '&copy; OpenStreetMap contributors' }).addTo(spotMap);
            spotMap.on('click', e => setCurrentLocation(e.latlng.lat, e.latlng.lng, 'Pinned on map'));
        }
        setTimeout(() => spotMap && spotMap.invalidateSize(), 80);
        return spotMap;
    }
    function setCurrentLocation(lat, lng, source, accuracy = null) {
        const numericAccuracy = Number(accuracy);
        currentLocation = { lat: Number(lat), lng: Number(lng), accuracy: Number.isFinite(numericAccuracy) && numericAccuracy > 0 ? numericAccuracy : null };
        getElement('locationTitle').textContent = source === 'Current location' ? 'Current location saved' : 'Location pinned';
        getElement('locationSubtitle').textContent = `${currentLocation.lat.toFixed(5)}, ${currentLocation.lng.toFixed(5)}${currentLocation.accuracy ? ` · GPS ±${Math.round(currentLocation.accuracy)} m` : ''} · tap map to move`;
        const map = initSpotMap();
        if (map) {
            if (spotMarker)
                spotMarker.setLatLng([lat, lng]);
            else
                spotMarker = L.marker([lat, lng]).addTo(map);
            map.setView([lat, lng], 15, { animate: true });
        }
        updateSpotProgress();
        if (activeCoachTour?.name === 'spot' && coachStepIndex === 4)
            showCoachStep(5);
    }
    function clearCurrentLocation() {
        currentLocation = null;
        getElement('locationTitle').textContent = 'Location not set';
        getElement('locationSubtitle').textContent = 'No location attached to this spot';
        if (spotMarker && spotMap) {
            spotMap.removeLayer(spotMarker);
            spotMarker = null;
        }
        updateSpotProgress();
    }
    getElement('locateButton').addEventListener('click', () => {
        if (!navigator.geolocation) {
            showToast('Location is not supported by this browser.');
            return;
        }
        const button = getElement('locateButton');
        button.disabled = true;
        button.textContent = 'LOCATING…';
        navigator.geolocation.getCurrentPosition(pos => { setCurrentLocation(pos.coords.latitude, pos.coords.longitude, 'Current location', pos.coords.accuracy); button.disabled = false; button.textContent = '◎ USE MY LOCATION'; showToast('Your location has been added.'); }, err => { button.disabled = false; button.textContent = '◎ USE MY LOCATION'; showToast(err.code === 1 ? 'Location permission was denied. You can tap the map to place a pin.' : 'Could not get your location. Try again or tap the map.'); }, { enableHighAccuracy: true, timeout: 14000, maximumAge: 30000 });
    });
    getElement('clearLocationButton').addEventListener('click', clearCurrentLocation);
    function resetSpotForm() {
        guidedDemoCar = null;
        getElement('spotForm').reset();
        getElement('makeSelect').value = '';
        getElement('makeSelect').dataset.lastValue = '';
        getElement('modelSelect').value = '';
        getElement('modelSelect').dataset.lastValue = '';
        getElement('modelSelect').disabled = true;
        getElement('trimSelect').value = '';
        updateModelOptions('');
        updateTrimOptions('', '');
        currentPhoto = '';
        getElement('photoLibraryInput').value = '';
        getElement('photoCameraInput').value = '';
        getElement('photoPreview').removeAttribute('src');
        getElement('photoDrop').classList.remove('has-photo', 'no-photo');
        getElement('photoStatus').textContent = 'No photo selected';
        getElement('yearInput').value = '';
        getElement('spottedAtInput').value = toLocalDateTimeInput();
        getElement('colorInput').value = '';
        getElement('placeInput').value = '';
        getElement('notesInput').value = '';
        getElement('notesCounter').textContent = '0 / 280';
        clearCurrentLocation();
        updateSpotRunNotice();
        updateSpotProgress();
    }
    getElement('viewLastSpotButton').addEventListener('click', () => {
        const spotId = getElement('viewLastSpotButton').dataset.spotId;
        if (spotId)
            openSpotDetail(spotId);
    });
    getElement('spotForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const vehicle = readVehicleFields('');
        if (!vehicle.make || !vehicle.model) {
            showToast('Choose a make and model first.');
            return;
        }
        const yearRaw = getElement('yearInput').value.trim(), year = yearRaw ? Number(yearRaw) : null;
        if (yearRaw && (!Number.isInteger(year) || year < 1886 || year > 2099)) {
            getElement('yearInput').focus();
            showToast('Enter a valid model year.');
            return;
        }
        const spottedAt = fromLocalDateTimeInput(getElement('spottedAtInput').value);
        if (!spottedAt) {
            getElement('spottedAtInput').focus();
            showToast('Choose a valid date and time for this sighting.');
            return;
        }
        const spot = { id: id(), ...vehicle, year, color: getElement('colorInput').value.trim(), place: getElement('placeInput').value.trim(), notes: getElement('notesInput').value.trim(), favorite: false, photo: currentPhoto, location: currentLocation ? { ...currentLocation } : null, createdAt: spottedAt, runId: activeRun()?.id || null };
        const continueSpotGuide = !!(activeCoachSequence && activeCoachTour?.name === 'spot' && coachSequenceIndex === 0 && coachStepIndex === activeCoachTour.steps.length - 1);
        if (continueSpotGuide)
            getElement('coachLayer').hidden = true;
        const button = getElement('saveSpotButton'), form = getElement('spotForm');
        button.disabled = true;
        button.classList.add('is-saving');
        form.classList.add('is-saving');
        button.innerHTML = '<span class="button-spinner" aria-hidden="true"></span>SAVING YOUR SIGHTING…';
        getElement('spotSuccessNote').hidden = true;
        data.spots.unshift(spot);
        try {
            await persist();
            const total = data.spots.length, progress = collectionProgress(total);
            resetSpotForm();
            renderAll();
            getElement('spotSuccessNote').hidden = true;
            const revealAction = await showSpotReveal(spot, total, progress);
            if (continueSpotGuide && activeCoachSequence) {
                advanceCoachSequence();
            }
            else if (revealAction === 'view') {
                navigate('garage');
                setTimeout(() => openSpotDetail(spot.id), 80);
            }
            else if (revealAction === 'another') {
                getElement('makeSelect').focus({ preventScroll: true });
            }
            if (navigator.vibrate && !document.body.classList.contains('reduce-motion')) {
                try {
                    navigator.vibrate([16, 35, 22]);
                }
                catch { }
            }
        }
        catch (err) {
            data.spots = data.spots.filter(s => s.id !== spot.id);
            showToast('Your spot could not be saved. Your form is still here — try again.');
            if (continueSpotGuide && activeCoachSequence) {
                getElement('coachLayer').hidden = false;
                queueCoachPosition();
            }
        }
        finally {
            button.disabled = false;
            button.classList.remove('is-saving');
            form.classList.remove('is-saving');
            button.innerHTML = 'SAVE TO GARAGE <span aria-hidden="true">↗</span>';
        }
    });
    getElement('logAnotherButton').addEventListener('click', () => {
        getElement('spotSuccessNote').hidden = true;
        getElement('spotSuccessNote').classList.remove('is-celebrating');
        const makeField = getElement('makeSelect');
        makeField.focus({ preventScroll: true });
        getElement('spotForm').scrollIntoView({ behavior: document.body.classList.contains('reduce-motion') ? 'auto' : 'smooth', block: 'start' });
    });
    function navigate(view) {
        const reduced = document.body.classList.contains('reduce-motion') || window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches === true;
        document.querySelectorAll('.view').forEach(el => {
            el.classList.toggle('active', el.id === `view-${view}`);
            el.classList.remove('motion-home', 'motion-spot', 'motion-garage', 'motion-trips', 'motion-profile');
        });
        const nextView = getElement(`view-${view}`);
        if (nextView && !reduced) {
            void nextView.offsetWidth;
            nextView.classList.add(`motion-${view}`);
            setTimeout(() => nextView.classList.remove(`motion-${view}`), 760);
        }
        document.querySelectorAll('[data-view]').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.view === view);
            btn.classList.remove('nav-motion');
            if (btn.dataset.view === view && !reduced) {
                void btn.offsetWidth;
                btn.classList.add('nav-motion');
                setTimeout(() => btn.classList.remove('nav-motion'), 620);
            }
        });
        getElement('currentSection').textContent = ({ home: 'HOME', spot: 'NEW SPOT', garage: 'MY GARAGE', trips: 'ROAD TRIPS', profile: 'PROFILE' })[view] || 'CARSPOTTER';
        if (view === 'home')
            renderHome();
        if (view === 'garage') {
            renderGarage();
            if (getElement('garageMapWrap').hidden === false)
                setTimeout(initGarageMap, 100);
        }
        if (view === 'trips')
            renderTrips();
        if (view === 'profile')
            renderProfile();
        if (view === 'spot' && spotMap)
            setTimeout(() => spotMap.invalidateSize(), 80);
        window.scrollTo({ top: 0, behavior: document.body.classList.contains('reduce-motion') ? 'auto' : 'smooth' });
    }
    document.querySelectorAll('[data-view]').forEach(btn => btn.addEventListener('click', () => navigate(btn.dataset.view)));
    document.addEventListener('click', e => {
        const btn = e.target.closest('[data-goto-view]');
        if (btn)
            navigate(btn.dataset.gotoView);
    });
    function renderStats() {
        getElement('overviewSpots').textContent = data.spots.length;
        getElement('overviewMakes').textContent = new Set(data.spots.map(s => s.make.toLowerCase())).size;
        getElement('overviewLocations').textContent = data.spots.filter(s => s.location).length;
        getElement('garageHeadingCount').textContent = `${data.spots.length} ${data.spots.length === 1 ? 'CAR' : 'CARS'} SAVED`;
        getElement('garageCountLabel').textContent = `${data.spots.length} ${data.spots.length === 1 ? 'CAR' : 'CARS'}`;
    }
    function noCarsMarkup(title, copy, button = true) { return `<div class="empty-state"><div class="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7"><path d="m3 14 2.1-5.2A2 2 0 0 1 7 7.5h10a2 2 0 0 1 1.9 1.3L21 14v5h-2v-2H5v2H3z"/><path d="M4 14h16"/><circle cx="7" cy="15" r="1"/><circle cx="17" cy="15" r="1"/></svg></div><h3>${escapeHTML(title)}</h3><p>${escapeHTML(copy)}</p>${button ? '<button class="primary-btn" data-goto-spot type="button">LOG YOUR FIRST CAR ↗</button>' : ''}</div>`; }
    function estimateRarity(spot) {
        const normalize = value => String(value || '')
            .toLowerCase()
            .replace(/&/g, ' and ')
            .replace(/[^a-z0-9]+/g, ' ')
            .trim()
            .replace(/\s+/g, ' ');
        const make = normalize(spot.make);
        const model = normalize(spot.model);
        const trim = normalize(spot.trim);
        const fullName = `${make} ${model} ${trim}`.trim();
        const has = (text, phrase) => {
            const p = normalize(phrase);
            return !!p && (` ${text} `).includes(` ${p} `);
        };
        const findMatch = (items, text = fullName) => items.find(item => has(text, item));
        const tiers = {
            common: { label: 'Common', rank: 1, description: 'Usually under $50,000: mainstream, higher-volume vehicles.' },
            uncommon: { label: 'Uncommon', rank: 2, description: 'Usually around $50,000–$99,999: pricier trims and enthusiast cars.' },
            rare: { label: 'Rare', rank: 3, description: 'Usually around $100,000–$199,999: premium sports cars and high-end performance models.' },
            epic: { label: 'Epic', rank: 4, description: 'Usually around $200,000–$499,999: supercars and expensive specialist models.' },
            legendary: { label: 'Legendary', rank: 5, description: 'Usually $500,000 or more: flagship exotics, halo cars and major collector models.' },
            cosmic: { label: 'Cosmic', rank: 6, description: 'Hypercars, dedicated race cars and track-only machines — a step beyond ordinary supercars.' }
        };

        // This is a rarity guide, not a live valuation. Prices are broad representative
        // model/trim estimates in USD; year, mileage, condition and options can move them.
        const brandTypicalPrices = {
            'acura': 38000, 'alfa romeo': 55000, 'aston martin': 210000, 'audi': 48000,
            'bentley': 260000, 'bmw': 48000, 'bugatti': 3000000, 'buick': 35000,
            'cadillac': 55000, 'chevrolet': 38000, 'chrysler': 35000, 'dodge': 42000,
            'ferrari': 300000, 'fiat': 25000, 'ford': 36000, 'genesis': 50000,
            'gmc': 45000, 'honda': 30000, 'hennessey': 300000, 'hyundai': 30000,
            'infiniti': 42000, 'jaguar': 60000, 'jeep': 45000, 'kia': 30000,
            'koenigsegg': 3000000, 'lamborghini': 300000, 'land rover': 75000,
            'lexus': 52000, 'lincoln': 60000, 'lotus': 100000, 'maserati': 140000,
            'mazda': 30000, 'mclaren': 280000, 'mercedes benz': 55000, 'mini': 30000,
            'mitsubishi': 30000, 'morgan': 100000, 'nissan': 35000, 'pagani': 3000000,
            'polestar': 55000, 'pontiac': 30000, 'porsche': 110000, 'ram': 45000,
            'rimac': 2200000, 'rivian': 80000, 'rolls royce': 400000, 'saleen': 100000,
            'ssc': 2500000, 'subaru': 35000, 'tesla': 45000, 'toyota': 35000,
            'volkswagen': 35000, 'volvo': 55000
        };

        // More specific estimates override the marque average. Longest exact-name
        // matches win, so e.g. a GT3 RS is not priced like a regular 911.
        const priceGuide = [
            ['ferrari', '812 competizione', 600000], ['ferrari', 'sf90', 520000],
            ['ferrari', 'fxx k', 2000000], ['ferrari', '599xx', 2000000],
            ['ferrari', '12cilindri', 400000], ['ferrari', '812 superfast', 350000],
            ['ferrari', '296 gtb', 350000], ['ferrari', '296 gts', 370000],
            ['ferrari', 'f8 tributo', 300000], ['ferrari', '488', 270000],
            ['ferrari', '458', 250000], ['ferrari', '430 scuderia', 300000],
            ['ferrari', '360 modena', 200000], ['ferrari', 'roma', 240000],
            ['ferrari', 'portofino', 230000], ['ferrari', 'daytona sp3', 2200000],
            ['ferrari', 'laferrari', 1500000], ['ferrari', 'la ferrari', 1500000],
            ['ferrari', 'enzo', 2500000], ['ferrari', 'f50', 3000000], ['ferrari', 'f40', 2500000],
            ['lamborghini', 'revuelto', 650000], ['lamborghini', 'aventador', 500000],
            ['lamborghini', 'huracan', 300000], ['lamborghini', 'urus', 250000],
            ['lamborghini', 'murcielago', 350000], ['lamborghini', 'gallardo', 200000],
            ['lamborghini', 'diablo', 350000], ['lamborghini', 'countach', 600000],
            ['lamborghini', 'sian', 3000000], ['lamborghini', 'reventon', 1800000],
            ['lamborghini', 'centenario', 2500000], ['lamborghini', 'veneno', 4000000],
            ['lamborghini', 'essenza scv12', 2500000],
            ['mclaren', 'f1', 20000000], ['mclaren', 'speedtail', 2500000],
            ['mclaren', 'senna', 1100000], ['mclaren', 'p1', 1500000],
            ['mclaren', '765lt', 450000], ['mclaren', '750s', 350000],
            ['mclaren', '720s', 330000], ['mclaren', '620r', 400000],
            ['mclaren', '600lt', 280000], ['mclaren', '570s', 220000],
            ['mclaren', 'artura', 250000], ['mclaren', 'solus gt', 3000000],
            ['aston martin', 'valkyrie', 3000000], ['aston martin', 'one 77', 2000000],
            ['aston martin', 'vulcan', 2500000], ['aston martin', 'victor', 3000000],
            ['aston martin', 'dbs', 350000], ['aston martin', 'vanquish', 350000],
            ['aston martin', 'db12', 250000], ['aston martin', 'db11', 220000],
            ['aston martin', 'vantage', 180000], ['aston martin', 'dbx', 220000],
            ['bentley', 'batur', 2000000], ['bentley', 'bacalar', 2000000],
            ['bentley', 'mulsanne', 350000], ['bentley', 'continental gt', 280000],
            ['bentley', 'flying spur', 250000], ['bentley', 'bentayga', 250000],
            ['rolls royce', 'phantom', 550000], ['rolls royce', 'cullinan', 450000],
            ['rolls royce', 'spectre', 420000], ['rolls royce', 'ghost', 370000],
            ['rolls royce', 'wraith', 350000], ['rolls royce', 'dawn', 350000],
            ['bugatti', 'tourbillon', 4000000], ['bugatti', 'bolide', 5000000],
            ['bugatti', 'divo', 5500000], ['bugatti', 'chiron', 3000000],
            ['bugatti', 'veyron', 1800000],
            ['koenigsegg', 'jesko', 3000000], ['koenigsegg', 'agera', 2500000],
            ['koenigsegg', 'regera', 2500000], ['koenigsegg', 'gemera', 1800000],
            ['koenigsegg', 'cc850', 3500000], ['koenigsegg', 'one 1', 4000000],
            ['pagani', 'zonda', 2500000], ['pagani', 'huayra', 2500000], ['pagani', 'utopia', 3000000],
            ['rimac', 'nevera', 2200000], ['ssc', 'tuatara', 2000000],
            ['hennessey', 'venom f5', 2500000], ['hennessey', 'venom gt', 1200000],
            ['maserati', 'mc12', 1200000], ['maserati', 'mc20', 250000],
            ['maserati', 'gran turismo', 180000],
            ['porsche', '918 spyder', 1000000], ['porsche', 'carrera gt', 900000],
            ['porsche', 'gt2 rs', 350000], ['porsche', 'gt3 rs', 280000],
            ['porsche', 'gt4 rs', 190000], ['porsche', '911 turbo s', 250000],
            ['porsche', '911 gt3', 210000], ['porsche', '911', 140000],
            ['porsche', '718', 90000], ['porsche', 'taycan', 120000],
            ['mercedes benz', 'amg one', 3000000], ['mercedes benz', 'slr mclaren', 500000],
            ['mercedes benz', 'sls amg', 250000], ['mercedes benz', 'amg gt black series', 350000],
            ['mercedes benz', 'g 63', 180000], ['mercedes benz', 'c 63', 100000],
            ['mercedes benz', 'e 63', 120000], ['mercedes benz', 's 63', 190000],
            ['bmw', 'm8', 150000], ['bmw', 'm5', 125000], ['bmw', 'm4 csl', 150000],
            ['bmw', 'm4', 95000], ['bmw', 'm3', 90000], ['bmw', 'm2', 70000], ['bmw', 'i8', 150000],
            ['audi', 'r8', 190000], ['audi', 'rs6 gt', 220000], ['audi', 'rs 6', 130000],
            ['audi', 'rs 7', 135000], ['audi', 'rs 3', 65000],
            ['lexus', 'lfa', 550000], ['lexus', 'lc 500', 105000], ['lexus', 'rc f', 85000],
            ['nissan', 'r35 nismo', 220000], ['nissan', 'gt r', 130000],
            ['nissan', 'skyline', 70000], ['nissan', 'z', 45000],
            ['acura', 'nsx type s', 180000], ['acura', 'nsx', 160000],
            ['honda', 'nsx type r', 250000], ['honda', 'nsx', 150000],
            ['mazda', 'rx 7', 80000], ['subaru', 'impreza 22b', 300000],
            ['ford', 'gt mk iv', 1700000], ['ford', 'ford gt', 1000000],
            ['ford', 'mustang gtd', 300000], ['ford', 'gt500', 100000],
            ['ford', 'gt350r', 100000], ['ford', 'mustang', 50000],
            ['chevrolet', 'corvette zr1', 220000], ['chevrolet', 'zr1', 200000],
            ['chevrolet', 'z06', 130000], ['chevrolet', 'corvette', 80000],
            ['dodge', 'viper acr', 160000], ['dodge', 'viper', 110000],
            ['dodge', 'hellcat', 85000], ['cadillac', 'ct5 v blackwing', 115000],
            ['toyota', '2000gt', 1000000], ['toyota', 'gr supra', 65000],
            ['toyota', 'supra', 65000], ['lotus', 'evija', 2200000],
            ['lotus', 'emira', 110000], ['lotus', 'exige', 100000],
            ['lotus', 'elise', 75000], ['lotus', 'evora', 110000]
        ];
        const applicablePrices = priceGuide
            .filter(([brand, phrase]) => make === brand && has(fullName, phrase))
            .sort((a, b) => b[1].length - a[1].length);
        let estimatedPrice = applicablePrices.length
            ? applicablePrices[0][2]
            : (brandTypicalPrices[make] || 35000);
        let priceSource = applicablePrices.length ? 'model/trim estimate' : 'marque-level estimate';

        // Limited/high-performance variants carry their own value premium where it
        // is meaningful, but ordinary appearance packages do not change rarity.
        const trimPremiums = [
            { terms: ['assetto fiorano'], make: 'ferrari', price: 600000 },
            { terms: ['pista'], make: 'ferrari', price: 450000 },
            { terms: ['speciale'], make: 'ferrari', price: 450000 },
            { terms: ['competizione'], make: 'ferrari', price: 600000 },
            { terms: ['svj'], make: 'lamborghini', price: 650000 },
            { terms: ['scv12'], make: 'lamborghini', price: 2500000 },
            { terms: ['sto'], make: 'lamborghini', price: 350000 },
            { terms: ['performante'], make: 'lamborghini', price: 330000 },
            { terms: ['765lt'], make: 'mclaren', price: 450000 },
            { terms: ['senna'], make: 'mclaren', price: 1100000 },
            { terms: ['gt3 rs'], make: 'porsche', price: 280000 },
            { terms: ['gt2 rs'], make: 'porsche', price: 350000 },
            { terms: ['turbo s'], make: 'porsche', price: 250000 },
            { terms: ['black series'], make: 'mercedes benz', price: 350000 },
            { terms: ['gtd'], make: 'ford', price: 300000 },
            { terms: ['nismo'], make: 'nissan', price: 220000 },
            { terms: ['z06'], make: 'chevrolet', price: 130000 },
            { terms: ['zr1'], make: 'chevrolet', price: 220000 }
        ];
        const trimPremium = trimPremiums.find(rule => make === rule.make && rule.terms.some(term => has(fullName, term)));
        if (trimPremium && trimPremium.price > estimatedPrice) {
            estimatedPrice = trimPremium.price;
            priceSource = 'limited/performance trim estimate';
        }

        const vehicleName = [spot.year, spot.make, spot.model, spot.trim].filter(Boolean).join(' ');
        let priceText = estimatedPrice >= 1000000
            ? `about $${(estimatedPrice / 1000000).toFixed(estimatedPrice % 1000000 ? 1 : 0)}M`
            : `about $${Math.round(estimatedPrice / 1000)}K`;
        let priceBand = estimatedPrice < 50000 ? 'Under $50K'
            : estimatedPrice < 100000 ? '$50K–$99K'
                : estimatedPrice < 200000 ? '$100K–$199K'
                    : estimatedPrice < 500000 ? '$200K–$499K'
                        : '$500K+';

        // Deliberately explicit marque floors: a normal Ferrari, Lamborghini or
        // McLaren is already an exotic, not merely a Rare car. Hypercar-only makers
        // start at Legendary. Their exact model can still affect the explanation.
        const epicFloorBrands = new Set(['ferrari', 'lamborghini', 'mclaren', 'aston martin']);
        const legendaryFloorBrands = new Set(['bugatti', 'koenigsegg', 'pagani', 'rimac', 'ssc']);
        let key = estimatedPrice < 50000 ? 'common'
            : estimatedPrice < 100000 ? 'uncommon'
                : estimatedPrice < 200000 ? 'rare'
                    : estimatedPrice < 500000 ? 'epic' : 'legendary';
        const reasons = [`Estimated price: ${priceText} (${priceBand}; ${priceSource})`];

        // Cosmic is intentionally easy to understand: it is for recognizable
        // hypercars, purpose-built competition cars and track-only machines.
        // These model rules override normal price bands, including exotic-brand caps.
        const cosmicHypercarModels = [
            'laferrari', 'la ferrari', 'enzo', 'f50', 'f80',
            'mclaren f1', 'p1', 'speedtail', 'senna',
            'valkyrie', 'amg one', 'clk gtr',
            '918 spyder', 'carrera gt',
            'veyron', 'chiron', 'tourbillon', 'bolide',
            'jesko', 'agera', 'regera', 'cc850', 'gemera', 'one 1', 'ccx', 'ccxr',
            'zonda', 'huayra', 'utopia', 'imola',
            'nevera', 'concept one', 'tuatara', 'venom f5', 'venom gt',
            'evija', 'sian', 'centenario', 'veneno', 'reventon',
            'daytona sp3', 'mc12', 'apollo ie', 'czinger 21c',
            'battista', 'lykan hypersport', 'fenyr supersport',
            'gordon murray t 50', 't 50s niki lauda'
        ];
        const cosmicRaceCarModels = [
            '787b', 'r26b', '917k', '917 30', '911 gt1', '962c', '962',
            '919 hybrid', 'porsche 963', '911 rsr', '911 gt3 r', '911 gt3 cup',
            'gt4 clubsport', 'gt2 clubsport', 'clk gtr', 'c9', 'c11',
            'fxx k', '599xx', '296 gt3', '488 gt3', '488 gte', '499p',
            'essenza scv12', 'huracan gt3', 'huracan super trofeo', 'gallardo super trofeo',
            'senna gtr', 'p1 gtr', '720s gt3', 'solus gt',
            'm4 gt3', 'm4 gt4', 'm8 gte', 'm3 gtr', 'm hybrid v8',
            'r8 lms', 'rs3 lms', 'amg gt3', 'sls amg gt3',
            'mustang gt3', 'ford gt mk iv', 'c8 r', 'c7 r', 'c6 r', 'c5 r', 'z06 gt3 r',
            'r390 gt1', 'r92cp', 'gr010', 'ts050', 'gt one', 'supra gt500',
            'nsx gt3', 'nsx gt500', 'arx 06', 'xjr 9', 'xjr 12', 'audi r18',
            'peugeot 9x8', 'cadillac v series r', 'lamborghini sc63',
            'impreza wrc', 'quattro s1', '205 turbo 16', 'delta s4', '037 rally',
            'lancer evo wrc', 'fabia rally2', 'yaris rally1', 'i20 n rally1',
            'i20 wrc', 'fiesta wrc', 'focus wrc'
        ];
        const hypercarMatch = findMatch(cosmicHypercarModels);
        const raceCarMatch = findMatch(cosmicRaceCarModels);
        const raceSeriesPattern = /\b(formula 1|formula one|formula e|f1 car|f1(?:\s?\d{2,4})?|rb\d{2}|indycar|nascar|lmp\s?[123]|lmh|lmdh|wrc|rally\s?[12]|group [abc]|imsa|wec|gt500|gt300|dtm|tcr|super trofeo|daytona prototype|stock car|dakar rally|rally raid|race car|racing car|track only|track car)\b/;
        const gtRacePattern = /\b(gt3|gt4|gt2|gte|gt1|rsr)\b/;
        // Road-going Porsche GT3/GT2 RS and Cayman GT4 RS models are not race cars.
        // Explicit race derivatives such as the 911 GT3 R and GT3 Cup are listed above.
        const porscheRoadPerformanceModel = make === 'porsche'
            && /\b911 gt2 rs\b|\b911 gt3(?: rs)?\b|\b718 (?:cayman )?gt4 rs?\b/.test(fullName);
        const genericRaceCar = raceSeriesPattern.test(fullName)
            || (gtRacePattern.test(fullName) && !porscheRoadPerformanceModel);

        if (hypercarMatch) {
            key = 'cosmic';
            reasons.push(`Recognized hypercar: ${hypercarMatch}`);
        }
        else if (raceCarMatch || genericRaceCar) {
            key = 'cosmic';
            reasons.push(`Dedicated race/competition car: ${raceCarMatch || 'race-series or competition specification'}`);
        }

        const legendaryModels = [
            'one 77', 'vulcan', 'victor', 'mulsanne', 'phantom', 'impreza 22b',
            'lfa', 'f40', 'f50', '959', 'sian', 'reventon', 'countach lpi',
            'centenario', 'miura', 'batur', 'bacalar'
        ];
        const legendaryMatch = findMatch(legendaryModels);
        if (key !== 'cosmic' && legendaryMatch) {
            key = 'legendary';
            reasons.push(`Recognized halo/collector model: ${legendaryMatch}`);
        }
        if (epicFloorBrands.has(make) && tiers[key].rank < tiers.epic.rank) {
            key = 'epic';
            reasons.push('Exotic marque floor: Epic');
        }
        if (legendaryFloorBrands.has(make) && tiers[key].rank < tiers.legendary.rank) {
            key = 'legendary';
            reasons.push('Hypercar marque floor: Legendary');
        }
        // A handful of iconic, genuinely scarce trims deserve a bump even where
        // their original sticker price does not reflect today's collector market.
        const rareCollectorModels = [
            'r34', 'rx 7 spirit r', 'viper acr', 'gt350r', 'impreza 22b',
            'sls amg', 'slr mclaren', 'lfa nurburgring', 'nsx type r', 'supra rz'
        ];
        const collectorMatch = findMatch(rareCollectorModels);
        if (collectorMatch && tiers[key].rank < tiers.rare.rank) {
            key = 'rare';
            reasons.push(`Collector/limited-production model: ${collectorMatch}`);
        }

        const tier = tiers[key];
        const reason = `${vehicleName || 'This vehicle'} — ${reasons.join('; ')}. Final tier: ${tier.label}. ${tier.description}`;
        return { key, ...tier, estimatedPrice, priceBand, priceText, reason };
    }
    function rarityMarkup(spot) {
        const r = estimateRarity(spot);
        return `<span class="rarity-badge rarity-${r.key}" title="${escapeHTML(r.reason)}">${r.label}</span>`;
    }
    function renderRarityCounts() {
        const counts = { common: 0, uncommon: 0, rare: 0, epic: 0, legendary: 0, cosmic: 0 };
        data.spots.forEach(s => counts[estimateRarity(s).key]++);
        const labels = { common: 'Common', uncommon: 'Uncommon', rare: 'Rare', epic: 'Epic', legendary: 'Legendary', cosmic: 'Cosmic' };
        const el = getElement('rarityCounts');
        if (!el)
            return;
        el.innerHTML = Object.entries(counts).map(([key, n]) => `<button type="button" class="rarity-count ${key}" data-rarity-filter="${key}" aria-label="Filter by ${labels[key]}: ${n} sightings"><span class="rarity-count-num">${n}</span><span class="rarity-count-label">${labels[key]}</span><i class="rarity-count-track"><b style="width:${data.spots.length ? Math.round(n / data.spots.length * 100) : 0}%"></b></i></button>`).join('');
    }
    function renderGarage() {
        renderStats();
        renderRarityCounts();
        const query = getElement('garageSearch').value.trim().toLowerCase();
        const sort = getElement('garageSort').value, filter = getElement('garageFilter').value;
        let spots = data.spots.filter(s => `${s.make} ${s.model} ${s.trim} ${s.year || ''} ${s.color || ''} ${s.place || ''} ${s.notes || ''}`.toLowerCase().includes(query));
        if (filter === 'favorites')
            spots = spots.filter(s => s.favorite);
        else if (filter === 'located')
            spots = spots.filter(s => s.location);
        else if (filter === 'no-photo')
            spots = spots.filter(s => !s.photo);
        else if (['common', 'uncommon', 'rare', 'epic', 'legendary', 'cosmic'].includes(filter))
            spots = spots.filter(s => estimateRarity(s).key === filter);
        if (sort === 'oldest')
            spots.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        else if (sort === 'az')
            spots.sort((a, b) => `${a.make} ${a.model}`.localeCompare(`${b.make} ${b.model}`));
        else if (sort === 'year')
            spots.sort((a, b) => (b.year || 0) - (a.year || 0));
        else if (sort === 'rarity')
            spots.sort((a, b) => estimateRarity(b).rank - estimateRarity(a).rank || new Date(b.createdAt) - new Date(a.createdAt));
        else
            spots.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        getElement('garageCountLabel').textContent = `${spots.length} ${spots.length === 1 ? 'MATCH' : 'MATCHES'}`;
        const container = getElement('garageCollection');
        if (!data.spots.length) {
            container.innerHTML = noCarsMarkup('Your garage starts here.', 'Save your first sighting and it will land here with its photo and details.');
        }
        else if (!spots.length) {
            const emptyCopy = { favorites: ['No favorites yet.', 'Open any sighting and tap the star to keep your best finds close.'], located: ['No pinned sightings.', 'Save a GPS location or place a pin on the map when logging a car.'], 'no-photo': ['Every sighting has a photo.', 'There are no photo-free entries in your collection right now.'] };
            const message = emptyCopy[filter] || ['No cars found.', 'Try another make, model, trim or note, or clear your search to see everything.'];
            container.innerHTML = noCarsMarkup(message[0], message[1], false);
        }
        else {
            container.innerHTML = spots.map((s, index) => {
                const run = s.runId ? data.runs.find(r => r.id === s.runId) : null;
                const photo = s.photo ? `<img class="car-image" src="${escapeHTML(s.photo)}" alt="${escapeHTML(s.make)} ${escapeHTML(s.model)}" loading="lazy">` : `<div class="car-image-placeholder"><span>PHOTO NOT ADDED</span><b>${escapeHTML((s.make || 'C').slice(0, 1) + (s.model || 'S').slice(0, 1))}</b></div>`;
                const rarity = estimateRarity(s);
                return `<article class="car-card rarity-card rarity-${rarity.key}" style="--card-index:${Math.min(index, 10)};--card-delay:${Math.min(index, 10) * 34}ms" data-open-spot="${escapeHTML(s.id)}" tabindex="0" role="button" aria-label="View ${escapeHTML(s.make)} ${escapeHTML(s.model)}"><div class="car-image-wrap">${photo}<span class="car-tag">${run ? 'ROAD TRIP' : 'FIELD SPOT'}</span><span class="car-rarity-overlay ${rarity.key}" title="${escapeHTML(rarity.reason)}">${rarity.label.toUpperCase()}</span>${s.favorite ? '<span class="favorite-chip" aria-label="Favorite">★</span>' : ''}</div><div class="car-card-body"><div class="car-make">${escapeHTML(s.make)} ${s.year ? `<span class="car-year">${s.year}</span>` : ''}</div><div class="car-model">${escapeHTML(s.model)}</div><div class="car-trim">${escapeHTML(s.trim || s.color || 'Trim not noted')}</div><div class="car-meta"><span>${s.place ? `⌖ ${escapeHTML(s.place)}` : s.location ? '⌖ Location saved' : 'Location not saved'}</span><span>${fmtDate(s.createdAt, { month: 'short', day: 'numeric', year: undefined })}</span></div></div></article>`;
            }).join('');
        }
    }
    getElement('garageSearch').addEventListener('input', renderGarage);
    getElement('garageSort').addEventListener('change', renderGarage);
    getElement('garageFilter').addEventListener('change', renderGarage);
    getElement('rarityCounts')?.addEventListener('click', e => {
        const btn = e.target.closest('[data-rarity-filter]');
        if (!btn)
            return;
        getElement('garageFilter').value = btn.dataset.rarityFilter;
        getElement('garageSort').value = 'rarity';
        renderGarage();
        getElement('garageCollection').scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
    getElement('garageCollection').addEventListener('click', e => {
        const card = e.target.closest('[data-open-spot]');
        if (card)
            openSpotDetail(card.dataset.openSpot);
    });
    getElement('garageCollection').addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open-spot]')) {
            e.preventDefault();
            openSpotDetail(e.target.dataset.openSpot);
        }
    });
    getElement('garageCollection').addEventListener('click', e => {
        if (e.target.closest('[data-goto-spot]'))
            navigate('spot');
    });
    document.querySelectorAll('[data-garage-mode]').forEach(btn => btn.addEventListener('click', () => {
        document.querySelectorAll('[data-garage-mode]').forEach(b => b.classList.toggle('active', b === btn));
        const isMap = btn.dataset.garageMode === 'map';
        getElement('garageCollection').hidden = isMap;
        getElement('garageMapWrap').hidden = !isMap;
        if (isMap) {
            requestAnimationFrame(() => setTimeout(initGarageMap, 140));
        }
    }));
    function loadLeafletFallback() {
        if (window.L)
            return Promise.resolve(true);
        if (leafletFallbackPromise)
            return leafletFallbackPromise;
        leafletFallbackPromise = new Promise(resolve => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.crossOrigin = 'anonymous';
            script.onload = () => resolve(!!window.L);
            script.onerror = () => resolve(false);
            document.head.appendChild(script);
        }).finally(() => {
            if (!window.L)
                leafletFallbackPromise = null;
        });
        return leafletFallbackPromise;
    }
    function showGarageMapMessage(title, message, withRetry = false) {
        const mapElement = getElement('garageMap');
        mapElement.querySelectorAll('.map-overlay').forEach(node => node.remove());
        const overlay = document.createElement('div');
        overlay.className = 'map-overlay' + (withRetry ? ' map-overlay-error' : '');
        const content = document.createElement('div');
        const heading = document.createElement('strong');
        heading.textContent = title;
        const copy = document.createElement('span');
        copy.textContent = message;
        content.append(heading, copy);
        if (withRetry) {
            const retry = document.createElement('button');
            retry.type = 'button';
            retry.className = 'map-retry-button';
            retry.textContent = 'TRY AGAIN';
            retry.addEventListener('click', () => { overlay.remove(); initGarageMap(); });
            content.appendChild(retry);
        }
        overlay.appendChild(content);
        mapElement.appendChild(overlay);
    }
    function refreshGarageMapSize() {
        const mapElement = getElement('garageMap');
        if (!garageMap || !mapElement || getElement('garageMapWrap').hidden || mapElement.getBoundingClientRect().width === 0)
            return;
        garageMap.invalidateSize({ pan: false });
    }
    async function initGarageMap() {
        const mapElement = getElement('garageMap');
        if (!mapElement)
            return;
        if (!window.L) {
            const loaded = await loadLeafletFallback();
            if (!loaded) {
                showGarageMapMessage('MAP COULD NOT LOAD', 'Check your connection, then try loading the map again.', true);
                return;
            }
        }
        if (!garageMap) {
            mapElement.replaceChildren();
            garageMap = L.map(mapElement, { zoomControl: true, scrollWheelZoom: false, tap: true, preferCanvas: true }).setView([39.5, -98.35], 4);
            garageTileLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                updateWhenIdle: true,
                keepBuffer: 3,
                attribution: '&copy; OpenStreetMap contributors',

            });
            garageTileLayer.on('tileerror', () => {
                garageTileErrorCount++;
                if (garageTileErrorCount >= 4 && !garageTileFallbackUsed) {
                    garageTileFallbackUsed = true;
                    garageTileErrorCount = 0;
                    garageTileLayer.setUrl('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png');
                    garageMap.attributionControl.addAttribution('&copy; CARTO');
                }
            });
            garageTileLayer.addTo(garageMap);
            if ('ResizeObserver' in window) {
                garageMapResizeObserver = new ResizeObserver(refreshGarageMapSize);
                garageMapResizeObserver.observe(mapElement);
            }
        }
        mapElement.querySelectorAll('.map-overlay').forEach(node => node.remove());
        garageMarkers.forEach(marker => garageMap.removeLayer(marker));
        garageMarkers = [];
        const located = data.spots.filter(s => {
            const loc = s.location;
            return loc && Number.isFinite(Number(loc.lat)) && Number.isFinite(Number(loc.lng)) && Number(loc.lat) >= -90 && Number(loc.lat) <= 90 && Number(loc.lng) >= -180 && Number(loc.lng) <= 180;
        });
        if (!located.length) {
            showGarageMapMessage('NO PINNED SIGHTINGS', 'Save a car with a GPS location or place a pin while logging a sighting.');
            garageMap.setView([39.5, -98.35], 4);
        }
        else {
            located.forEach(s => {
                const icon = L.divIcon({ className: '', html: '<div class="spot-pin"></div>', iconSize: [18, 18], iconAnchor: [9, 9] });
                const marker = L.marker([Number(s.location.lat), Number(s.location.lng)], { icon, keyboard: true }).addTo(garageMap);
                const popup = `<div class="map-spot-popup"><b>${escapeHTML(s.year ? `${s.year} ` : '')}${escapeHTML(s.make)} ${escapeHTML(s.model)}</b><span>${escapeHTML(s.trim || s.color || s.place || '')}</span>${s.photo ? `<img src="${escapeHTML(s.photo)}" alt="">` : ''}<button type="button" data-map-spot="${escapeHTML(s.id)}">VIEW SIGHTING ↗</button></div>`;
                marker.bindPopup(popup, { maxWidth: 230 });
                marker.on('popupopen', () => {
                    const button = marker.getPopup()?.getElement()?.querySelector('[data-map-spot]');
                    if (button)
                        button.addEventListener('click', () => openSpotDetail(s.id), { once: true });
                });
                garageMarkers.push(marker);
            });
            if (garageMarkers.length === 1) {
                garageMap.setView(garageMarkers[0].getLatLng(), 13);
            }
            else {
                const bounds = L.featureGroup(garageMarkers).getBounds();
                if (bounds.isValid())
                    garageMap.fitBounds(bounds.pad(.18), { maxZoom: 12 });
            }
        }
        requestAnimationFrame(() => requestAnimationFrame(refreshGarageMapSize));
        setTimeout(refreshGarageMapSize, 260);
        setTimeout(refreshGarageMapSize, 620);
    }
    function openSpotDetail(spotId) {
        const spot = data.spots.find(s => s.id === spotId);
        if (!spot)
            return;
        currentDetailId = spotId;
        getElement('detailPhoto').src = spot.photo || '';
        getElement('detailPhoto').hidden = !spot.photo;
        getElement('detailNoPhoto').hidden = !!spot.photo;
        getElement('spotDetailTitle').textContent = `${spot.year ? spot.year + ' ' : ''}${spot.make} ${spot.model}`;
        getElement('spotDetailSubtitle').textContent = `${spot.favorite ? '★ Favorite sighting · ' : ''}${fmtDateTime(spot.createdAt)}`;
        getElement('detailMake').textContent = spot.make;
        getElement('detailModel').textContent = spot.model;
        getElement('detailTrim').textContent = spot.trim || 'Not specified';
        getElement('detailYear').textContent = spot.year || 'Not noted';
        getElement('detailColor').textContent = spot.color || 'Not noted';
        getElement('detailDate').textContent = fmtDateTime(spot.createdAt);
        getElement('detailPlace').textContent = spot.place || 'Not noted';
        getElement('detailLocation').textContent = spot.location ? `${spot.location.lat.toFixed(5)}, ${spot.location.lng.toFixed(5)}` : 'Not saved';
        getElement('detailMapLink').hidden = !spot.location;
        getElement('detailMapLink').href = spot.location ? `https://www.openstreetmap.org/?mlat=${encodeURIComponent(spot.location.lat)}&mlon=${encodeURIComponent(spot.location.lng)}#map=16/${encodeURIComponent(spot.location.lat)}/${encodeURIComponent(spot.location.lng)}` : '#';
        getElement('detailNotesWrap').hidden = !spot.notes;
        getElement('detailNotes').textContent = spot.notes || '';
        getElement('favoriteSpotButton').textContent = spot.favorite ? '★ SAVED TO FAVORITES' : '☆ SAVE AS FAVORITE';
        getElement('favoriteSpotButton').classList.toggle('favorite-toggle', !!spot.favorite);
        const run = spot.runId ? data.runs.find(r => r.id === spot.runId) : null;
        getElement('detailRun').textContent = run ? run.name : 'Not part of a run';
        showModal('spotDetailModal');
    }
    getElement('favoriteSpotButton').addEventListener('click', async () => {
        const spot = data.spots.find(s => s.id === currentDetailId);
        if (!spot)
            return;
        spot.favorite = !spot.favorite;
        try {
            await persist();
            renderAll();
            openSpotDetail(spot.id);
            showToast(spot.favorite ? 'Added to favorites.' : 'Removed from favorites.');
        }
        catch {
            spot.favorite = !spot.favorite;
        }
    });
    getElement('editSpotButton').addEventListener('click', () => {
        const spot = data.spots.find(s => s.id === currentDetailId);
        if (!spot)
            return;
        currentEditId = spot.id;
        editPhoto = '';
        setVehicleFields('edit', spot);
        getElement('editPhotoPreview').src = spot.photo || '';
        getElement('editPhotoStatus').textContent = spot.photo ? 'Current photo' : 'No photo saved';
        getElement('editYearInput').value = spot.year || '';
        getElement('editSpottedAtInput').value = toLocalDateTimeInput(spot.createdAt);
        getElement('editColorInput').value = spot.color || '';
        getElement('editPlaceInput').value = spot.place || '';
        getElement('editNotesInput').value = spot.notes || '';
        hideModal('spotDetailModal');
        showModal('editSpotModal');
    });
    getElement('saveEditButton').addEventListener('click', async () => {
        const spot = data.spots.find(s => s.id === currentEditId);
        if (!spot)
            return;
        const fields = readVehicleFields('edit');
        if (!fields.make || !fields.model) {
            showToast('Make and model are required.');
            return;
        }
        const yearRaw = getElement('editYearInput').value.trim(), year = yearRaw ? Number(yearRaw) : null;
        if (yearRaw && (!Number.isInteger(year) || year < 1886 || year > 2099)) {
            showToast('Enter a valid model year.');
            return;
        }
        const editedSpottedAt = fromLocalDateTimeInput(getElement('editSpottedAtInput').value);
        if (!editedSpottedAt) {
            getElement('editSpottedAtInput').focus();
            showToast('Choose a valid date and time for this sighting.');
            return;
        }
        const old = clone(spot);
        Object.assign(spot, fields, { year, color: getElement('editColorInput').value.trim(), place: getElement('editPlaceInput').value.trim(), notes: getElement('editNotesInput').value.trim(), createdAt: editedSpottedAt });
        if (editPhoto)
            spot.photo = editPhoto;
        getElement('saveEditButton').disabled = true;
        getElement('saveEditButton').textContent = 'SAVING…';
        try {
            await persist();
            hideModal('editSpotModal');
            renderAll();
            openSpotDetail(spot.id);
            showToast('Spot updated.');
        }
        catch {
            Object.assign(spot, old);
        }
        finally {
            getElement('saveEditButton').disabled = false;
            getElement('saveEditButton').textContent = 'SAVE CHANGES';
        }
    });
    getElement('deleteSpotButton').addEventListener('click', async () => {
        const spot = data.spots.find(s => s.id === currentDetailId);
        if (!spot)
            return;
        if (!confirm(`Delete ${spot.make} ${spot.model} from your garage? This cannot be undone.`))
            return;
        const index = data.spots.findIndex(s => s.id === spot.id);
        const [removed] = data.spots.splice(index, 1);
        try {
            await persist();
            hideModal('spotDetailModal');
            renderAll();
            showToast('Spot deleted.');
        }
        catch {
            data.spots.splice(index, 0, removed);
        }
    });
    function renderTrips() {
        const active = activeRun(), activeSpots = active ? spotsForRun(active.id) : [];
        getElement('runTotalMetric').textContent = data.runs.length;
        getElement('runCarsMetric').textContent = data.spots.filter(s => s.runId).length;
        getElement('runActiveMetric').textContent = activeSpots.length;
        getElement('pastRunCount').textContent = `${data.runs.length} SAVED`;
        if (active) {
            getElement('runStatus').innerHTML = '<i class="live-dot"></i> RUN IN PROGRESS';
            getElement('runHeroTitle').textContent = active.name;
            getElement('runHeroCopy').textContent = `Started ${fmtDateTime(active.startedAt)}. ${activeSpots.length} ${activeSpots.length === 1 ? 'car' : 'cars'} spotted. New spots are being added automatically.`;
            getElement('runActionButton').textContent = 'FINISH THIS RUN';
            getElement('runActionButton').dataset.action = 'finish';
        }
        else {
            getElement('runStatus').innerHTML = '<i class="live-dot"></i> READY WHEN YOU ARE';
            getElement('runHeroTitle').textContent = 'No active run.';
            getElement('runHeroCopy').textContent = 'Start a run and your new spots will be collected here. Finish it whenever you’re done.';
            getElement('runActionButton').textContent = 'START A RUN ↗';
            getElement('runActionButton').dataset.action = 'start';
        }
        const list = getElement('runList');
        if (!data.runs.length) {
            list.innerHTML = '<div class="run-empty"><strong>No runs saved yet.</strong>Start one before your next meet or drive. Cars you spot during it will be grouped here.</div>';
            return;
        }
        list.innerHTML = [...data.runs].sort((a, b) => new Date(b.startedAt) - new Date(a.startedAt)).map(run => {
            const cars = spotsForRun(run.id), date = new Date(run.startedAt), thumbs = cars.slice(0, 3).map(s => s.photo ? `<img src="${escapeHTML(s.photo)}" alt="" loading="lazy">` : `<span class="run-thumb-empty" aria-label="No photo">${escapeHTML((s.make || 'C').slice(0, 1))}</span>`).join('');
            return `<article class="run-card" data-open-run="${escapeHTML(run.id)}" tabindex="0" role="button" aria-label="View run ${escapeHTML(run.name)}"><div class="run-date"><b>${date.getDate()}</b><span>${fmtMonth(run.startedAt)}</span></div><div class="run-info"><strong>${escapeHTML(run.name)}</strong><p>${fmtDateTime(run.startedAt)} · ${run.endedAt ? `Finished ${fmtDateTime(run.endedAt)}` : 'In progress'}</p></div><div class="run-thumbs">${thumbs}${cars.length > 3 ? `<span class="thumb-more">+${cars.length - 3}</span>` : ''}</div><div class="run-count"><b>${cars.length}</b> ${cars.length === 1 ? 'CAR' : 'CARS'}</div></article>`;
        }).join('');
    }
    getElement('runList').addEventListener('click', e => {
        const card = e.target.closest('[data-open-run]');
        if (card)
            openRunDetail(card.dataset.openRun);
    });
    getElement('runList').addEventListener('keydown', e => {
        if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('[data-open-run]')) {
            e.preventDefault();
            openRunDetail(e.target.dataset.openRun);
        }
    });
    function openStartRunModal() {
        getElement('runNameInput').value = `Run — ${fmtDate(new Date().toISOString(), { month: 'short', day: 'numeric' })}`;
        getElement('runStartedAtInput').value = toLocalDateTimeInput();
        showModal('startRunModal');
    }
    getElement('runActionButton').addEventListener('click', () => {
        if (activeRun()) {
            if (confirm('Finish this run? New spots will no longer be added to it.'))
                finishActiveRun();
        }
        else
            openStartRunModal();
    });
    getElement('confirmStartRun').addEventListener('click', async () => {
        const name = getElement('runNameInput').value.trim() || `Run — ${fmtDate(new Date().toISOString())}`;
        const startedAt = fromLocalDateTimeInput(getElement('runStartedAtInput').value);
        if (!startedAt) {
            getElement('runStartedAtInput').focus();
            showToast('Choose a valid start date and time.');
            return;
        }
        const run = { id: id(), name, startedAt, endedAt: null };
        data.runs.unshift(run);
        data.activeRunId = run.id;
        try {
            await persist();
            hideModal('startRunModal');
            renderAll();
            showToast('Run started. Your next spots will be added automatically.');
        }
        catch {
            data.runs = data.runs.filter(r => r.id !== run.id);
            data.activeRunId = null;
        }
    });
    async function finishActiveRun() {
        const run = activeRun();
        if (!run)
            return;
        run.endedAt = new Date().toISOString();
        data.activeRunId = null;
        try {
            await persist();
            renderAll();
            showToast('Run saved.');
        }
        catch {
            run.endedAt = null;
            data.activeRunId = run.id;
        }
    }
    function openRunDetail(runId) {
        const run = data.runs.find(r => r.id === runId);
        if (!run)
            return;
        currentRunDetailId = run.id;
        const cars = spotsForRun(run.id);
        getElement('runDetailTitle').textContent = run.name;
        getElement('runDetailSubtitle').textContent = `${fmtDateTime(run.startedAt)} · ${run.endedAt ? `Finished ${fmtDateTime(run.endedAt)}` : 'In progress'} · ${cars.length} ${cars.length === 1 ? 'car' : 'cars'}`;
        getElement('runStartedAtEdit').value = toLocalDateTimeInput(run.startedAt);
        getElement('runEndedAtEdit').value = run.endedAt ? toLocalDateTimeInput(run.endedAt) : '';
        getElement('runCarGrid').innerHTML = cars.map(s => `<button class="run-car-mini" type="button" data-open-spot-from-run="${escapeHTML(s.id)}">${s.photo ? `<img src="${escapeHTML(s.photo)}" alt="">` : '<span class="run-no-photo">NO PHOTO</span>'}<strong>${escapeHTML(s.year ? `${s.year} ` : '')}${escapeHTML(s.make)} ${escapeHTML(s.model)}</strong><span>${escapeHTML(s.trim || s.color || '')}</span></button>`).join('');
        getElement('runNoCars').hidden = !!cars.length;
        showModal('runDetailModal');
    }
    getElement('saveRunTimesButton').addEventListener('click', async () => {
        const run = data.runs.find(item => item.id === currentRunDetailId);
        if (!run)
            return;
        const startedAt = fromLocalDateTimeInput(getElement('runStartedAtEdit').value);
        const endedAt = getElement('runEndedAtEdit').value ? fromLocalDateTimeInput(getElement('runEndedAtEdit').value) : null;
        if (!startedAt) {
            getElement('runStartedAtEdit').focus();
            showToast('Choose a valid road trip start date and time.');
            return;
        }
        if (getElement('runEndedAtEdit').value && !endedAt) {
            getElement('runEndedAtEdit').focus();
            showToast('Choose a valid finish date and time, or leave it blank.');
            return;
        }
        if (endedAt && new Date(endedAt) < new Date(startedAt)) {
            getElement('runEndedAtEdit').focus();
            showToast('The finish time must be after the start time.');
            return;
        }
        if (!endedAt && activeRun() && activeRun().id !== run.id) {
            showToast('Finish the other active trip before reopening this one.');
            return;
        }
        const oldStartedAt = run.startedAt, oldEndedAt = run.endedAt, oldActiveRunId = data.activeRunId;
        run.startedAt = startedAt;
        run.endedAt = endedAt;
        data.activeRunId = endedAt ? (data.activeRunId === run.id ? null : data.activeRunId) : run.id;
        getElement('saveRunTimesButton').disabled = true;
        getElement('saveRunTimesButton').textContent = 'SAVING…';
        try {
            await persist();
            renderAll();
            const cars = spotsForRun(run.id);
            getElement('runDetailSubtitle').textContent = `${fmtDateTime(run.startedAt)} · ${run.endedAt ? `Finished ${fmtDateTime(run.endedAt)}` : 'In progress'} · ${cars.length} ${cars.length === 1 ? 'car' : 'cars'}`;
            getElement('runStartedAtEdit').value = toLocalDateTimeInput(run.startedAt);
            getElement('runEndedAtEdit').value = run.endedAt ? toLocalDateTimeInput(run.endedAt) : '';
            showToast('Road trip dates and times updated.');
        }
        catch {
            run.startedAt = oldStartedAt;
            run.endedAt = oldEndedAt;
            data.activeRunId = oldActiveRunId;
        }
        finally {
            getElement('saveRunTimesButton').disabled = false;
            getElement('saveRunTimesButton').textContent = 'SAVE TRIP TIMES';
        }
    });
    getElement('runCarGrid').addEventListener('click', e => {
        const card = e.target.closest('[data-open-spot-from-run]');
        if (card) {
            hideModal('runDetailModal');
            openSpotDetail(card.dataset.openSpotFromRun);
        }
    });
    getElement('deleteRunButton').addEventListener('click', async () => {
        const run = data.runs.find(r => r.id === currentRunDetailId);
        if (!run)
            return;
        if (!confirm(`Delete the run “${run.name}”? The cars will stay in your garage, but will no longer belong to this run.`))
            return;
        const oldRuns = data.runs, oldActive = data.activeRunId, oldAssignments = data.spots.map(s => [s.id, s.runId]);
        data.runs = data.runs.filter(r => r.id !== run.id);
        data.spots.forEach(s => {
            if (s.runId === run.id)
                s.runId = null;
        });
        if (data.activeRunId === run.id)
            data.activeRunId = null;
        try {
            await persist();
            hideModal('runDetailModal');
            renderAll();
            showToast('Run deleted. Your car spots were kept.');
        }
        catch {
            data.runs = oldRuns;
            data.activeRunId = oldActive;
            oldAssignments.forEach(([spotId, runId]) => {
                const s = data.spots.find(x => x.id === spotId);
                if (s)
                    s.runId = runId;
            });
        }
    });
    function loadProfile() {
        try {
            const saved = JSON.parse(localStorage.getItem(PROFILE_KEY) || 'null');
            if (saved && typeof saved === 'object')
                profile = { ...profile, ...saved };
        }
        catch { }
        applyAccessibility();
    }
    function saveProfileLocal() {
        try {
            localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
            return true;
        }
        catch {
            showToast('Could not save profile settings on this device.');
            return false;
        }
    }
    function applyAccessibility() {
        document.body.classList.toggle('reduce-motion', !!profile.reduceMotion);
        document.body.classList.toggle('large-text', !!profile.largeText);
        document.body.classList.toggle('high-contrast', !!profile.highContrast);
        if (getElement('reduceMotionToggle'))
            getElement('reduceMotionToggle').checked = !!profile.reduceMotion;
        if (getElement('largeTextToggle'))
            getElement('largeTextToggle').checked = !!profile.largeText;
        if (getElement('highContrastToggle'))
            getElement('highContrastToggle').checked = !!profile.highContrast;
    }
    function setProfileAvatar() {
        const img = getElement('profileAvatarImage'), initials = getElement('profileInitials');
        if (profile.avatar) {
            img.src = profile.avatar;
            img.hidden = false;
            initials.hidden = true;
        }
        else {
            img.hidden = true;
            initials.hidden = false;
        }
    }
    function renderProfile() {
        getElement('profileNameInput').value = profile.name || 'Car enthusiast';
        getElement('profileDisplayName').textContent = profile.name || 'Car enthusiast';
        getElement('profileInitials').textContent = (profile.name || 'Car enthusiast').trim().split(/\s+/).slice(0, 2).map(x => x[0] || '').join('').toUpperCase() || 'CS';
        setProfileAvatar();
        getElement('profileThemeSelect').value = document.body.dataset.theme || 'light';
        applyAccessibility();
    }
    function renderHomeHero() {
        const photo = data.homeHeroPhoto || '';
        const img = getElement('homeHeroPhoto'), defaultArt = getElement('homeHeroDefaultArt');
        if (!img || !defaultArt)
            return;
        if (photo) {
            img.src = photo;
            img.hidden = false;
            defaultArt.hidden = true;
            getElement('homeHeroChangePhoto').textContent = '↻ CHANGE PHOTO';
            getElement('homeHeroResetPhoto').hidden = false;
        }
        else {
            img.removeAttribute('src');
            img.hidden = true;
            defaultArt.hidden = false;
            getElement('homeHeroChangePhoto').textContent = '＋ SET HERO PHOTO';
            getElement('homeHeroResetPhoto').hidden = true;
        }
    }
    function renderHome() {
        renderHomeHero();
        if (!getElement('homeRecentList'))
            return;
        const makes = new Set(data.spots.map(s => s.make.toLowerCase())).size;
        animateHomeNumber(getElement('homeTotal'), data.spots.length);
        animateHomeNumber(getElement('homeMakes'), makes);
        animateHomeNumber(getElement('homeLocations'), data.spots.filter(s => s.location).length);
        animateHomeNumber(getElement('homeRuns'), data.runs.length);
        getElement('homeTodayLabel').textContent = new Date().toLocaleDateString(undefined, { weekday: 'long', month: 'short', day: 'numeric' }).toUpperCase();
        const sorted = [...data.spots].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        const recent = sorted.slice(0, 4);
        getElement('homeRecentList').innerHTML = recent.length ? recent.map(s => `<button class="home-recent-item" type="button" data-home-spot="${escapeHTML(s.id)}"><span class="home-recent-photo">${s.photo ? `<img src="${escapeHTML(s.photo)}" alt="">` : `<b>${escapeHTML((s.make || 'C').slice(0, 1) + (s.model || 'S').slice(0, 1))}</b>`}</span><span class="home-recent-info"><strong>${escapeHTML(s.year ? `${s.year} ` : '')}${escapeHTML(s.make)} <span>${escapeHTML(s.model)}</span>${s.favorite ? ' ★' : ''}</strong><small>${escapeHTML(s.place || s.color || s.trim || 'Sighting saved')} · ${fmtDate(s.createdAt, { month: 'short', day: 'numeric' })}</small></span><span class="home-recent-arrow">↗</span></button>`).join('') : `<div class="home-empty"><div class="home-empty-icon">＋</div><strong>Your first spot is waiting.</strong><p>Save a car you see and it will show up here.</p><button type="button" data-goto-view="spot">LOG YOUR FIRST CAR ↗</button></div>`;
        const counts = {};
        data.spots.forEach(s => { const key = s.make || 'Unknown'; counts[key] = (counts[key] || 0) + 1; });
        const top = Object.entries(counts).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))[0];
        getElement('homeTopMake').textContent = top ? top[0] : 'No data yet';
        getElement('homeTopMakeInitial').textContent = top ? top[0].slice(0, 2).toUpperCase() : '—';
        getElement('homeTopMakeCount').textContent = top ? `${top[1]} ${top[1] === 1 ? 'spot' : 'spots'} in your garage` : 'Your collection is waiting.';
        getElement('homeFavoriteCount').textContent = `${data.spots.filter(s => s.favorite).length} favorites saved`;
        const active = activeRun();
        if (active) {
            getElement('homeRunTitle').textContent = active.name;
            getElement('homeRunCopy').textContent = `Your run is active. ${spotsForRun(active.id).length} cars spotted so far.`;
            getElement('homeRunButton').textContent = 'VIEW ROAD TRIPS ↗';
            getElement('homeRunButton').dataset.go = 'trips';
        }
        else {
            getElement('homeRunTitle').textContent = 'READY FOR A RUN?';
            getElement('homeRunCopy').textContent = 'Start a road trip and keep every sighting from the day together.';
            getElement('homeRunButton').textContent = 'START A ROAD TRIP ↗';
            getElement('homeRunButton').dataset.go = 'start';
        }
    }
    getElement('homeRecentList').addEventListener('click', e => {
        const item = e.target.closest('[data-home-spot]');
        if (item)
            openSpotDetail(item.dataset.homeSpot);
    });
    getElement('homeRunButton').addEventListener('click', () => {
        if (getElement('homeRunButton').dataset.go === 'trips')
            navigate('trips');
        else
            openStartRunModal();
    });
    getElement('saveProfileButton').addEventListener('click', () => { profile.name = getElement('profileNameInput').value.trim().slice(0, 32) || 'Car enthusiast'; saveProfileLocal(); renderProfile(); showToast('Profile saved on this device.'); });
    getElement('profilePhotoInput').addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            profile.avatar = await compressPhoto(file, 480, 0.78);
            saveProfileLocal();
            renderProfile();
            showToast('Profile picture updated.');
        }
        catch (err) {
            showToast(err.message || 'Could not use that picture.');
        }
        finally {
            getElement('profilePhotoInput').value = '';
        }
    });
    getElement('profileThemeSelect').addEventListener('change', e => { setTheme(e.target.value); profile.theme = e.target.value; saveProfileLocal(); });
    [['reduceMotionToggle', 'reduceMotion'], ['largeTextToggle', 'largeText'], ['highContrastToggle', 'highContrast']].forEach(([element, key]) => getElement(element).addEventListener('change', e => { profile[key] = e.target.checked; saveProfileLocal(); applyAccessibility(); }));
    getElement('profileDataButton').addEventListener('click', () => showModal('dataModal'));
    function renderAll() {
        renderStats();
        renderHome();
        renderGarage();
        renderTrips();
        updateSpotRunNotice();
        if (garageMap && getElement('garageMapWrap').hidden === false)
            initGarageMap();
    }
    getElement('dataButton').addEventListener('click', () => showModal('dataModal'));
    getElement('exportButton').addEventListener('click', () => {
        const backup = { app: 'CarSpotter', schemaVersion: 4, exportedAt: new Date().toISOString(), data, profile };
        const blob = new Blob([JSON.stringify(backup)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `carspotter-backup-${new Date().toISOString().slice(0, 10)}.json`;
        document.body.appendChild(a);
        a.click();
        a.remove();
        setTimeout(() => URL.revokeObjectURL(url), 1500);
        showToast('Backup downloaded. Keep that file somewhere safe.');
    });
    getElement('importButton').addEventListener('click', () => getElement('importFile').click());
    getElement('importFile').addEventListener('change', async (e) => {
        const file = e.target.files?.[0];
        if (!file)
            return;
        try {
            if (file.size > 250 * 1024 * 1024)
                throw new Error('Backup is larger than 250 MB.');
            const parsed = JSON.parse(await file.text());
            const rawData = parsed.data || parsed;
            if (!rawData || !Array.isArray(rawData.spots) || !Array.isArray(rawData.runs))
                throw new Error('This does not look like a CarSpotter backup.');
            const incoming = normalizeData(rawData);
            const incomingProfile = parsed.profile && typeof parsed.profile === 'object' ? { ...profile, ...parsed.profile } : null;
            if (!confirm(`Replace this browser’s collection with ${incoming.spots.length} cars and ${incoming.runs.length} runs from this backup?`))
                return;
            const old = data, oldProfile = profile;
            data = incoming;
            if (incomingProfile)
                profile = incomingProfile;
            try {
                await persist();
                saveProfileLocal();
                hideModal('dataModal');
                renderAll();
                renderProfile();
                showToast('Backup restored successfully.');
            }
            catch {
                data = old;
                profile = oldProfile;
            }
        }
        catch (err) {
            showToast(err.message || 'Could not read this backup file.');
        }
        finally {
            getElement('importFile').value = '';
        }
    });
    getElement('clearAllButton').addEventListener('click', async () => {
        if (!confirm('Permanently delete every saved car, photo and run from this browser? Export a backup first if you may want these later.'))
            return;
        const old = data;
        data = { spots: [], runs: [], activeRunId: null, homeHeroPhoto: '' };
        try {
            await persist();
            hideModal('dataModal');
            renderAll();
            showToast('All CarSpotter data cleared.');
        }
        catch {
            data = old;
        }
    });
    const ONBOARDING_KEY = 'carspotter.onboarding.visual.v4';
    function readEmbeddedGuidePhoto(target) {
        const tile = document.querySelector(`[data-guide-target="${target}"]`);
        const value = tile?.style.getPropertyValue('--guide-photo') || '';
        const match = value.match(/^url\(["']?(.*?)["']?\)$/s);
        return match?.[1] || '';
    }
    function setupFirstSpotChoices() {
        const photos = {
            corvette: readEmbeddedGuidePhoto('spot'),
            porsche: readEmbeddedGuidePhoto('garage'),
            mazda: readEmbeddedGuidePhoto('trips'),
            bmw: 'https://mediapool.bmwgroup.com/cache/P9/202103/P90416655/P90416655-the-all-new-bmw-m3-competition-sedan-with-m-xdrive-04-2021-2250px.jpg'
        };
        document.querySelectorAll('[data-first-spot-choice]').forEach(card => {
            const photo = photos[card.dataset.demoPhotoKey] || '';
            const image = card.querySelector('[data-sample-photo]');
            if (image && photo)
                image.style.backgroundImage = `url("${photo}")`;
            card.addEventListener('click', () => startFirstSpotDemo(card, photo));
        });
    }
    function startFirstSpotDemo(card, photo) {
        if (!photo) {
            showToast('That sample photo could not be loaded. Choose another car.');
            return;
        }
        resetSpotForm();
        guidedDemoCar = {
            make: card.dataset.demoMake || '',
            model: card.dataset.demoModel || '',
            trim: card.dataset.demoTrim || '',
            color: card.dataset.demoColor || ''
        };
        getElement('colorInput').value = guidedDemoCar.color;
        getElement('spottedAtInput').value = toLocalDateTimeInput();
        currentPhoto = photo;
        getElement('photoPreview').src = photo;
        getElement('photoDrop').classList.remove('no-photo');
        getElement('photoDrop').classList.add('has-photo');
        getElement('photoStatus').textContent = 'Sample photo ready · you can change it';
        updateSpotProgress();
        hideModal('firstSpotChoiceModal');
        hideModal('onboardingModal');
        activeCoachSequence = true;
        coachSequenceIndex = 0;
        navigate('spot');
        coachSequenceTimer = setTimeout(() => {
            coachSequenceTimer = 0;
            if (activeCoachSequence && coachSequenceIndex === 0)
                startCoachTour('spot');
        }, 150);
    }
    function skipFirstSpotSample() {
        hideModal('firstSpotChoiceModal');
        startFullCoachSequence();
    }
    function finishGuide() {
        try {
            localStorage.setItem(ONBOARDING_KEY, '1');
        }
        catch { }
        hideModal('onboardingModal');
        hideModal('firstSpotChoiceModal');
    }
    function openGuide() {
        if (coachSequenceTimer)
            clearTimeout(coachSequenceTimer);
        coachSequenceTimer = 0;
        activeCoachSequence = false;
        coachSequenceIndex = -1;
        clearCoachPresentation(true);
        hideModal('onboardingModal');
        hideModal('firstSpotChoiceModal');
        guidedDemoCar = null;
        showModal('firstSpotChoiceModal');
    }
    getElement('helpGuideButton').addEventListener('click', openGuide);
    getElement('guideCloseButton').addEventListener('click', finishGuide);
    getElement('guideSkipButton').addEventListener('click', finishGuide);
    getElement('firstSpotCloseButton').addEventListener('click', finishGuide);
    getElement('firstSpotSkipButton').addEventListener('click', skipFirstSpotSample);
    setupFirstSpotChoices();
    document.querySelectorAll('[data-guide-target]').forEach(card => {
        card.addEventListener('click', () => startFullCoachSequence());
    });
    const coachIcons = {
        car: '<svg viewBox="0 0 32 32"><path d="m4 19 2.2-6.2A3 3 0 0 1 9 11h14a3 3 0 0 1 2.8 1.8L28 19v6h-3v-2H7v2H4z"/><path d="M5 19h22M9 11l2-4h10l2 4M9 20h.01M23 20h.01"/></svg>',
        model: '<svg viewBox="0 0 32 32"><circle cx="14" cy="14" r="8"/><path d="m20 20 7 7M10 14h8M14 10v8"/></svg>',
        clock: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12"/><path d="M16 9v8l5 3"/></svg>',
        camera: '<svg viewBox="0 0 32 32"><path d="M4 11h6l2-3h8l2 3h6v15H4z"/><circle cx="16" cy="18" r="5"/><path d="M8 14h.01"/></svg>',
        pin: '<svg viewBox="0 0 32 32"><path d="M26 14c0 8-10 15-10 15S6 22 6 14a10 10 0 1 1 20 0Z"/><circle cx="16" cy="14" r="3.2"/></svg>',
        save: '<svg viewBox="0 0 32 32"><path d="M6 5h17l4 4v18H6z"/><path d="M11 5v8h11V5M11 27v-9h11v9"/><path d="m13 22 2 2 5-5"/></svg>',
        search: '<svg viewBox="0 0 32 32"><circle cx="13.5" cy="13.5" r="8.5"/><path d="m20 20 7 7"/></svg>',
        sort: '<svg viewBox="0 0 32 32"><path d="M9 6v20m0 0-4-4m4 4 4-4M23 26V6m0 0-4 4m4-4 4 4"/></svg>',
        filter: '<svg viewBox="0 0 32 32"><path d="M5 7h22l-8.5 10v8l-5 2V17z"/></svg>',
        map: '<svg viewBox="0 0 32 32"><path d="m4 8 8-4 8 4 8-4v20l-8 4-8-4-8 4zM12 4v20m8-16v20"/><circle cx="20" cy="12" r="2.5"/></svg>',
        grid: '<svg viewBox="0 0 32 32"><rect x="4" y="4" width="10" height="10" rx="2"/><rect x="18" y="4" width="10" height="10" rx="2"/><rect x="4" y="18" width="10" height="10" rx="2"/><rect x="18" y="18" width="10" height="10" rx="2"/></svg>',
        route: '<svg viewBox="0 0 32 32"><circle cx="7" cy="25" r="3"/><circle cx="25" cy="7" r="3"/><path d="M10 25h5a4 4 0 0 0 4-4v-6a4 4 0 0 1 4-4h2"/></svg>',
        edit: '<svg viewBox="0 0 32 32"><path d="m6 22-1 6 6-1L27 11l-5-5zM19 9l5 5"/></svg>',
        play: '<svg viewBox="0 0 32 32"><circle cx="16" cy="16" r="12"/><path d="m13 10 9 6-9 6z"/></svg>',
        download: '<svg viewBox="0 0 32 32"><path d="M16 4v17m0 0 7-7m-7 7-7-7M5 23v5h22v-5"/></svg>',
        upload: '<svg viewBox="0 0 32 32"><path d="M16 24V7m0 0-7 7m7-7 7 7M5 24v4h22v-4"/></svg>',
        flag: '<svg viewBox="0 0 32 32"><path d="M8 28V5m0 1c7-5 12 5 19 0v13c-7 5-12-5-19 0"/></svg>',
        spark: '<svg viewBox="0 0 32 32"><path d="m16 3 3.3 9.7L29 16l-9.7 3.3L16 29l-3.3-9.7L3 16l9.7-3.3z"/><path d="m25 3 .9 2.1L28 6l-2.1.9L25 9l-.9-2.1L22 6l2.1-.9z"/></svg>'
    };
    const coachTours = {
        spot: [
            { selector: '#makeSelect', title: 'MAKE', icon: 'car', focus: true },
            { selector: '#modelSelect', title: 'MODEL', icon: 'model', focus: true },
            { selector: '#spottedAtInput', title: 'DATE & TIME', icon: 'clock' },
            { selector: '#photoDrop', title: 'PHOTO', icon: 'camera' },
            { selector: '.location-card', title: 'LOCATION', icon: 'pin' },
            { selector: '#saveSpotButton', title: 'SAVE CAR', icon: 'save' }
        ],
        garage: [
            { selector: '.rarity-overview', title: 'RARITY', icon: 'spark' },
            { selector: '#garageSearch', title: 'SEARCH', icon: 'search' },
            { selector: '#garageSort', title: 'SORT', icon: 'sort' },
            { selector: '#garageFilter', title: 'FILTER', icon: 'filter' },
            { selector: '#garageCollection', title: 'YOUR CARS', icon: 'grid' },
            { selector: '[data-garage-mode="map"]', title: 'MAP VIEW', icon: 'map' }
        ],
        data: [
            { selector: '#exportButton', title: 'EXPORT', icon: 'download' },
            { selector: '#importButton', title: 'IMPORT', icon: 'upload' }
        ]
    };
    let activeCoachTour = null;
    let coachStepIndex = 0;
    let coachOpenedModal = null;
    let coachPositionFrame = 0;
    let activeCoachSelect = null;
    const coachSequence = ['spot', 'garage', 'trips', 'data'];
    let activeCoachSequence = false;
    let coachSequenceIndex = -1;
    let coachSequenceTimer = 0;
    function coachHintForStep(step) {
        if (activeCoachTour?.name !== 'spot')
            return 'Use the highlighted area. Tap or type there to try this feature.';
        switch (step.title) {
            case 'MAKE': return guidedDemoCar ? `Type “${guidedDemoCar.make}” in this box. Then tap “${guidedDemoCar.make}” in the suggestion list.` : 'TYPE a car brand in this box. Then TAP the matching suggestion in the list.';
            case 'MODEL': return guidedDemoCar ? `Type “${guidedDemoCar.model}” in this box. Then tap “${guidedDemoCar.model}” in the suggestion list.` : 'TYPE the car model in this box. Then TAP the matching suggestion in the list.';
            case 'DATE & TIME': return 'The date and time are already filled in. TAP the field only if you want to change them.';
            case 'PHOTO': return currentPhoto ? 'Your sample photo is already here. TAP CHANGE PHOTO to choose your own, or keep this one.' : 'TAP ADD PHOTO to choose a picture, or CONTINUE WITHOUT PHOTO.';
            case 'LOCATION': return 'TAP USE MY LOCATION for GPS, or TAP THE MAP to place the pin somewhere else.';
            case 'SAVE CAR': return 'Your car is ready. TAP SAVE TO GARAGE to finish and add it to your collection.';
            default: return 'Use the highlighted area. Tap or type there to try this feature.';
        }
    }
    function onGuidedSuggestionSelected(event) {
        if (activeCoachTour?.name !== 'spot')
            return;
        const field = event.currentTarget;
        const value = String(event.detail?.value || field.value || '').trim();
        if (field.id === 'makeSelect' && coachStepIndex === 0) {
            if (guidedDemoCar && value.toLowerCase() !== guidedDemoCar.make.toLowerCase()) {
                showToast(`Choose ${guidedDemoCar.make} for this sample car.`);
                return;
            }
            showCoachStep(1);
            return;
        }
        if (field.id === 'modelSelect' && coachStepIndex === 1) {
            if (guidedDemoCar && value.toLowerCase() !== guidedDemoCar.model.toLowerCase()) {
                showToast(`Choose ${guidedDemoCar.model} for this sample car.`);
                return;
            }
            if (guidedDemoCar) {
                updateTrimOptions('', guidedDemoCar.trim);
                getElement('colorInput').value = guidedDemoCar.color;
            }
            getElement('spottedAtInput').value = toLocalDateTimeInput();
            showCoachStep(2);
        }
    }
    getElement('makeSelect').addEventListener('carspotter:suggestion-selected', onGuidedSuggestionSelected);
    getElement('modelSelect').addEventListener('carspotter:suggestion-selected', onGuidedSuggestionSelected);
    function closeCoachSelectMenu() {
        const menu = getElement('coachSelectMenu');
        if (menu)
            menu.remove();
        activeCoachSelect = null;
    }
    function restoreCoachPortaledDropdowns(closeMenus = false) {
        document.querySelectorAll('#coachLayer .autocomplete-menu[data-coach-dropdown-for]').forEach(menu => {
            const input = getElement(menu.dataset.coachDropdownFor);
            const wrap = input?.closest('.autocomplete-wrap');
            if (wrap) {
                if (wrap.contains(menu) === false)
                    wrap.appendChild(menu);
                delete menu.dataset.coachDropdownFor;
                menu.style.cssText = '';
                if (closeMenus) {
                    wrap.classList.remove('is-open');
                    input.setAttribute('aria-expanded', 'false');
                    input.removeAttribute('aria-activedescendant');
                    wrap.querySelector('.autocomplete-toggle')?.setAttribute('aria-expanded', 'false');
                }
            }
        });
    }
    function openCoachSelectMenu(select) {
        if (!activeCoachTour || !select || select.tagName !== 'SELECT')
            return;
        closeCoachSelectMenu();
        activeCoachSelect = select;
        const menu = document.createElement('div');
        menu.id = 'coachSelectMenu';
        menu.className = 'coach-select-menu';
        menu.setAttribute('role', 'listbox');
        menu.setAttribute('aria-label', select.getAttribute('aria-label') || 'Choose an option');
        Array.from(select.options).forEach(option => {
            if (option.disabled)
                return;
            const button = document.createElement('button');
            button.type = 'button';
            button.className = 'coach-select-option';
            button.setAttribute('role', 'option');
            button.setAttribute('aria-selected', String(option.value === select.value));
            button.textContent = option.textContent.trim();
            button.addEventListener('click', () => {
                select.value = option.value;
                select.dispatchEvent(new Event('input', { bubbles: true }));
                select.dispatchEvent(new Event('change', { bubbles: true }));
                closeCoachSelectMenu();
                try {
                    select.focus({ preventScroll: true });
                }
                catch {
                    select.focus();
                }
                queueCoachPosition();
            });
            menu.appendChild(button);
        });
        getElement('coachLayer').appendChild(menu);
        const rect = select.getBoundingClientRect();
        const width = Math.min(Math.max(rect.width, 180), window.innerWidth - 24);
        menu.style.width = `${width}px`;
        menu.style.left = `${Math.max(12, Math.min(rect.left, window.innerWidth - width - 12))}px`;
        const availableBelow = window.innerHeight - rect.bottom - 18;
        const estimatedHeight = Math.min(menu.scrollHeight || 220, Math.min(280, window.innerHeight * .42));
        const placeAbove = availableBelow < Math.min(estimatedHeight, 150) && rect.top > availableBelow;
        const top = placeAbove ? Math.max(8, rect.top - estimatedHeight - 8) : Math.min(window.innerHeight - estimatedHeight - 8, rect.bottom + 8);
        menu.style.top = `${Math.max(8, top)}px`;
        queueCoachPosition();
    }
    function getTripCoachSteps() {
        if (data.activeRunId)
            return [
                { selector: '#runStatus', title: 'ACTIVE RUN', icon: 'route' },
                { selector: '#runActionButton', title: 'FINISH DRIVE', icon: 'flag' },
                { selector: '#runList', title: 'SAVED TRIPS', icon: 'grid' }
            ];
        return [
            { selector: '#runActionButton', title: 'START A RUN', icon: 'flag', closeModal: 'startRunModal' },
            { selector: '#runNameInput', title: 'NAME IT', icon: 'edit', openModal: 'startRunModal' },
            { selector: '#runStartedAtInput', title: 'DATE & TIME', icon: 'clock', openModal: 'startRunModal' },
            { selector: '#confirmStartRun', title: 'START', icon: 'play', openModal: 'startRunModal' },
            { selector: '#runList', title: 'YOUR TRIPS', icon: 'grid', closeModal: 'startRunModal' }
        ];
    }
    function coachTargetRect(target) {
        let r = target.getBoundingClientRect();
        let dropdownElement = null;
        const guideSelectMenu = target === activeCoachSelect ? getElement('coachSelectMenu') : null;
        const suggestionWrap = target.closest('.autocomplete-wrap');
        let dropdownOpen = false;
        if (guideSelectMenu && guideSelectMenu.getBoundingClientRect().height > 0) {
            dropdownElement = guideSelectMenu;
            r = guideSelectMenu.getBoundingClientRect();
            dropdownOpen = true;
        }
        if (suggestionWrap) {
            const menu = document.querySelector(`#coachLayer .autocomplete-menu[data-coach-dropdown-for="${target.id}"]`)
                || suggestionWrap.querySelector('.autocomplete-menu');
            if (suggestionWrap.classList.contains('is-open') && menu && menu.getBoundingClientRect().height > 0) {
                dropdownElement = menu;
                const menuRect = menu.getBoundingClientRect();
                const wrapRect = suggestionWrap.getBoundingClientRect();
                r = {
                    left: Math.min(wrapRect.left, menuRect.left),
                    top: Math.min(wrapRect.top, menuRect.top),
                    right: Math.max(wrapRect.right, menuRect.right),
                    bottom: Math.max(wrapRect.bottom, menuRect.bottom),
                    width: Math.max(wrapRect.right, menuRect.right) - Math.min(wrapRect.left, menuRect.left),
                    height: Math.max(wrapRect.bottom, menuRect.bottom) - Math.min(wrapRect.top, menuRect.top)
                };
                dropdownOpen = true;
            }
            else {
                dropdownElement = null;
                r = suggestionWrap.getBoundingClientRect();
            }
        }
        let top = r.top, height = r.height;
        const keepFullTarget = target.id === 'photoDrop' || target.classList.contains('location-card');
        if (!dropdownOpen && height > 150 && !keepFullTarget) {
            height = Math.min(112, height);
            top = r.top + Math.max(0, (r.height - height) / 2);
        }
        if (dropdownOpen) {
            top = Math.max(4, top);
            height = Math.min(height, window.innerHeight - top - 4);
        }
        const width = Math.min(Math.max(r.width, 44), window.innerWidth - 24);
        const left = Math.max(12, Math.min(r.left + (r.width - width) / 2, window.innerWidth - width - 12));
        return {
            top: Math.max(4, top - 4),
            left: Math.max(4, left - 4),
            width: width + 8,
            height: Math.max(42, height) + 8,
            raw: r,
            dropdownOpen,
            pointerRect: dropdownElement ? dropdownElement.getBoundingClientRect() : r,
            radiusTarget: dropdownElement || target.closest('.autocomplete-wrap') || target
        };
    }
    function updateCoachBlockers(box) {
        const viewportWidth = window.innerWidth;
        const viewportHeight = window.innerHeight;
        const left = Math.max(0, Math.min(viewportWidth, box.left));
        const top = Math.max(0, Math.min(viewportHeight, box.top));
        const right = Math.max(left, Math.min(viewportWidth, box.left + box.width));
        const bottom = Math.max(top, Math.min(viewportHeight, box.top + box.height));
        const rects = {
            top: { left: 0, top: 0, width: viewportWidth, height: top },
            left: { left: 0, top, width: left, height: bottom - top },
            right: { left: right, top, width: viewportWidth - right, height: bottom - top },
            bottom: { left: 0, top: bottom, width: viewportWidth, height: viewportHeight - bottom }
        };
        Object.entries(rects).forEach(([name, rect]) => {
            const blocker = document.querySelector(`[data-coach-blocker="${name}"]`);
            if (!blocker)
                return;
            blocker.style.left = `${rect.left}px`;
            blocker.style.top = `${rect.top}px`;
            blocker.style.width = `${Math.max(0, rect.width)}px`;
            blocker.style.height = `${Math.max(0, rect.height)}px`;
        });
    }
    function positionCoach() {
        if (!activeCoachTour || getElement('coachLayer').hidden)
            return;
        const step = activeCoachTour.steps[coachStepIndex];
        const target = step && document.querySelector(step.selector);
        if (!target || !target.getClientRects().length)
            return;
        const box = coachTargetRect(target);
        const spotlight = getElement('coachSpotlight');
        spotlight.style.top = `${box.top}px`;
        spotlight.style.left = `${box.left}px`;
        spotlight.style.width = `${box.width}px`;
        spotlight.style.height = `${box.height}px`;
        const radiusTarget = box.radiusTarget || target;
        spotlight.style.borderRadius = getComputedStyle(radiusTarget).borderRadius || '14px';
        spotlight.classList.toggle('is-dropdown', box.dropdownOpen);
        updateCoachBlockers(box);
        const pointer = getElement('coachPointer');
        const pointerRect = box.pointerRect || box.raw;
        pointer.style.display = box.dropdownOpen ? 'none' : '';
        pointer.style.left = `${Math.max(5, Math.min(pointerRect.right - 8, window.innerWidth - 38))}px`;
        pointer.style.top = `${Math.max(5, Math.min(pointerRect.bottom - 12, window.innerHeight - 45))}px`;
        const card = getElement('coachCard');
        const cardWidth = card.offsetWidth || Math.min(420, window.innerWidth - 28);
        const cardHeight = card.offsetHeight || 190;
        const bottomReserve = window.innerWidth <= 760 ? 88 : 16;
        const maxTop = Math.max(12, window.innerHeight - cardHeight - bottomReserve);
        const gap = 15;
        let top = box.dropdownOpen
            ? box.raw.top - cardHeight - gap
            : box.raw.bottom + gap;
        if (top < 12 || top + cardHeight > maxTop) {
            if (box.dropdownOpen)
                top = Math.min(maxTop, Math.max(12, box.raw.bottom + gap));
            else
                top = box.raw.top - cardHeight - gap;
        }
        top = Math.max(12, Math.min(top, maxTop));
        let left = box.raw.left + box.raw.width / 2 - cardWidth / 2;
        left = Math.max(12, Math.min(left, window.innerWidth - cardWidth - 12));
        card.style.top = `${top}px`;
        card.style.left = `${left}px`;
    }
    function queueCoachPosition() {
        if (coachPositionFrame)
            cancelAnimationFrame(coachPositionFrame);
        coachPositionFrame = requestAnimationFrame(() => {
            coachPositionFrame = 0;
            positionCoach();
        });
    }
    function clearCoachPresentation(closeOwnedModal = true, preserveModal = null) {
        restoreCoachPortaledDropdowns(true);
        closeCoachSelectMenu();
        if (closeOwnedModal && coachOpenedModal && coachOpenedModal !== preserveModal && getElement(coachOpenedModal)?.classList.contains('show')) {
            hideModal(coachOpenedModal);
        }
        coachOpenedModal = preserveModal;
        activeCoachTour = null;
        getElement('coachLayer').hidden = true;
        getElement('coachSpotlight').style.cssText = '';
        getElement('coachSpotlight').classList.remove('is-dropdown');
        getElement('coachPointer').style.cssText = '';
        getElement('coachCard').style.cssText = '';
        document.querySelectorAll('[data-coach-blocker]').forEach(blocker => blocker.style.cssText = '');
    }
    function finishCoachTour(closeOwnedModal = true) {
        activeCoachSequence = false;
        coachSequenceIndex = -1;
        if (coachSequenceTimer)
            clearTimeout(coachSequenceTimer);
        coachSequenceTimer = 0;
        clearCoachPresentation(closeOwnedModal);
        try {
            localStorage.setItem(ONBOARDING_KEY, '1');
        }
        catch { }
    }
    function launchCoachSequenceSection(index) {
        if (!activeCoachSequence)
            return;
        if (index >= coachSequence.length) {
            finishCoachTour();
            showToast('You’re ready to use CarSpotter.');
            return;
        }
        const name = coachSequence[index];
        if (name === 'data') {
            showModal('dataModal');
            startCoachTour('data', 'dataModal');
            return;
        }
        if (coachOpenedModal && getElement(coachOpenedModal)?.classList.contains('show')) {
            hideModal(coachOpenedModal);
            coachOpenedModal = null;
        }
        navigate(name);
        coachSequenceTimer = setTimeout(() => {
            coachSequenceTimer = 0;
            if (activeCoachSequence && coachSequenceIndex === index)
                startCoachTour(name);
        }, 130);
    }
    function advanceCoachSequence() {
        if (!activeCoachSequence) {
            finishCoachTour();
            return;
        }
        coachSequenceIndex += 1;
        launchCoachSequenceSection(coachSequenceIndex);
    }
    function startFullCoachSequence() {
        if (coachSequenceTimer)
            clearTimeout(coachSequenceTimer);
        coachSequenceTimer = 0;
        clearCoachPresentation(true);
        hideModal('onboardingModal');
        hideModal('firstSpotChoiceModal');
        guidedDemoCar = null;
        activeCoachSequence = true;
        coachSequenceIndex = 0;
        try {
            localStorage.setItem(ONBOARDING_KEY, 'shown');
        }
        catch { }
        launchCoachSequenceSection(0);
    }
    async function showCoachStep(index) {
        if (!activeCoachTour)
            return;
        closeCoachSelectMenu();
        if (index < 0)
            index = 0;
        if (index >= activeCoachTour.steps.length) {
            advanceCoachSequence();
            return;
        }
        coachStepIndex = index;
        const step = activeCoachTour.steps[index];
        if (step.closeModal && getElement(step.closeModal)?.classList.contains('show')) {
            hideModal(step.closeModal);
            if (coachOpenedModal === step.closeModal)
                coachOpenedModal = null;
        }
        if (step.openModal && !getElement(step.openModal)?.classList.contains('show')) {
            showModal(step.openModal);
            coachOpenedModal = step.openModal;
            await new Promise(resolve => setTimeout(resolve, 100));
            if (!activeCoachTour || coachStepIndex !== index)
                return;
        }
        let target = document.querySelector(step.selector);
        if (!target || !target.getClientRects().length) {
            showCoachStep(index + 1);
            return;
        }
        target.scrollIntoView({ behavior: 'auto', block: 'center', inline: 'nearest' });
        getElement('coachVisual').innerHTML = coachIcons[step.icon] || coachIcons.spark;
        getElement('coachStepTitle').textContent = step.title;
        getElement('coachStepHint').textContent = coachHintForStep(step);
        getElement('coachStepCount').textContent = `${String(index + 1).padStart(2, '0')} / ${String(activeCoachTour.steps.length).padStart(2, '0')}`;
        getElement('coachProgress').innerHTML = activeCoachTour.steps.map((_, i) => `<i class="${i <= index ? 'active' : ''}"></i>`).join('');
        getElement('coachBack').disabled = index === 0;
        const saveRequired = activeCoachSequence && activeCoachTour.name === 'spot' && coachSequenceIndex === 0 && index === activeCoachTour.steps.length - 1;
        getElement('coachNext').disabled = saveRequired;
        getElement('coachNext').textContent = saveRequired ? 'SAVE TO CONTINUE' : index === activeCoachTour.steps.length - 1
            ? (activeCoachSequence && coachSequenceIndex < coachSequence.length - 1 ? 'NEXT GUIDE ↗' : 'FINISH ✓')
            : 'NEXT ↗';
        getElement('coachSkip').textContent = 'SKIP ALL';
        getElement('coachLayer').hidden = false;
        await new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve)));
        if (activeCoachTour && coachStepIndex === index) {
            positionCoach();
            if (step.focus && !target.disabled) {
                try {
                    target.focus({ preventScroll: true });
                }
                catch {
                    target.focus();
                }
                queueCoachPosition();
            }
        }
    }
    function startCoachTour(name, alreadyOpenedModal = null) {
        clearCoachPresentation(true, alreadyOpenedModal);
        const steps = name === 'trips' ? getTripCoachSteps() : coachTours[name];
        if (!steps?.length) {
            if (activeCoachSequence)
                advanceCoachSequence();
            return;
        }
        activeCoachTour = { name, steps };
        coachOpenedModal = alreadyOpenedModal;
        getElement('coachLayer').hidden = false;
        showCoachStep(0);
    }
    getElement('coachNext').addEventListener('click', () => showCoachStep(coachStepIndex + 1));
    getElement('coachBack').addEventListener('click', () => showCoachStep(coachStepIndex - 1));
    getElement('coachSkip').addEventListener('click', () => finishCoachTour());
    getElement('coachClose').addEventListener('click', () => finishCoachTour());
    document.addEventListener('keydown', event => {
        if (event.key === 'Escape' && activeCoachTour) {
            event.preventDefault();
            event.stopImmediatePropagation();
            if (activeCoachSelect) {
                closeCoachSelectMenu();
                queueCoachPosition();
            }
            else
                finishCoachTour();
        }
    }, true);
    window.addEventListener('resize', queueCoachPosition, { passive: true });
    window.addEventListener('scroll', queueCoachPosition, { passive: true, capture: true });
    const coachDropdownObserver = new MutationObserver(() => {
        if (activeCoachTour?.name === 'spot')
            queueCoachPosition();
    });
    coachDropdownObserver.observe(getElement('spotForm'), {
        subtree: true,
        childList: true,
        attributes: true,
        attributeFilter: ['class', 'style', 'aria-expanded']
    });
    document.querySelectorAll('[data-coach-blocker]').forEach(blocker => {
        blocker.addEventListener('wheel', event => event.preventDefault(), { passive: false });
    });
    document.addEventListener('click', event => {
        if (!activeCoachTour)
            return;
        const step = activeCoachTour.steps[coachStepIndex];
        const target = step && document.querySelector(step.selector);
        if (target && target.tagName === 'SELECT' && event.target === target) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openCoachSelectMenu(target);
        }
    }, true);
    document.addEventListener('keydown', event => {
        if (!activeCoachTour)
            return;
        const step = activeCoachTour.steps[coachStepIndex];
        const target = step && document.querySelector(step.selector);
        if (target && target.tagName === 'SELECT' && event.target === target && ['Enter', ' ', 'ArrowDown'].includes(event.key)) {
            event.preventDefault();
            event.stopImmediatePropagation();
            openCoachSelectMenu(target);
        }
    }, true);
    document.addEventListener('click', event => {
        if (!activeCoachTour)
            return;
        if (event.target.closest('[data-view]')) {
            finishCoachTour();
            return;
        }
        const closeButton = event.target.closest('[data-close-modal]');
        if (closeButton && coachOpenedModal === closeButton.dataset.closeModal)
            finishCoachTour(false);
    }, true);
    const guideRarityLabels = {
        Common: 'COMMON', Uncommon: 'UNCOMMON', Rare: 'RARE',
        Epic: 'EPIC', Legendary: 'LEGENDARY', Cosmic: 'COSMIC'
    };
    document.querySelectorAll('[data-guide-rarity]').forEach(chip => {
        chip.addEventListener('click', () => {
            const rarity = chip.dataset.guideRarity;
            document.querySelectorAll('[data-guide-rarity]').forEach(item => item.setAttribute('aria-pressed', String(item === chip)));
            getElement('guideRarityCurrent').textContent = guideRarityLabels[rarity] || rarity.toUpperCase();
            const preview = getElement('guideRarityPreview');
            preview.dataset.rarity = rarity;
            preview.querySelector('strong').textContent = guideRarityLabels[rarity] || rarity.toUpperCase();
            preview.querySelector('span').textContent = rarity === 'Cosmic' ? 'ALL THE COLORS' : 'YOUR SPOTTING TIER';
        });
    });
    async function init() {
        loadProfile();
        await bootStorage();
        getElement('spottedAtInput').value = toLocalDateTimeInput();
        renderAll();
        renderProfile();
        let guideSeen = false;
        try {
            guideSeen = !!localStorage.getItem(ONBOARDING_KEY);
        }
        catch { }
        if (!guideSeen && data.spots.length === 0 && data.runs.length === 0) {
            getElement('toast').classList.remove('show');
            clearTimeout(toastTimer);
            showModal('firstSpotChoiceModal');
        }
        if (window.L)
            initSpotMap();
    }
    init();
})();