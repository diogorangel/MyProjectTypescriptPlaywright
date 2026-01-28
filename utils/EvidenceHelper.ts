import fs from 'fs';
import path from 'path';
const imagesToPdf = require('images-to-pdf');

export class EvidenceHelper {
    static async generatePDF(testName: string) {
        const evidenceDir = path.join(process.cwd(), 'evidence');
        
        // Get all .png files from the folder
        const files = fs.readdirSync(evidenceDir)
            .filter(file => file.endsWith('.png'))
            .map(file => path.join(evidenceDir, file));

        if (files.length === 0) {
            console.log('No screenshots found to generate PDF.');
            return;
        }

        const outputPath = path.join(process.cwd(), `evidence/${testName}_Report.pdf`);
        
        // Convert images to PDF
        await imagesToPdf(files, outputPath);
        console.log(`✅ Evidence PDF generated: ${outputPath}`);
    }
}