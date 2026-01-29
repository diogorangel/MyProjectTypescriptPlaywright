import * as fs from 'fs';
import * as path from 'path';

// @ts-ignore
const imagesToPdf = require('images-to-pdf');

export class EvidenceHelper {
    static async generatePDF(testName: string, evidenceDir?: string) {
        const dir = evidenceDir || path.join(process.cwd(), 'evidence');
        if (!fs.existsSync(dir)) return;

        const files = fs.readdirSync(dir)
            .filter(file => file.endsWith('.png'))
            .map(file => path.join(dir, file));

        if (files.length === 0) return;

        // Sanitiza o nome do arquivo para evitar caracteres inválidos
        const safeName = testName.replace(/[^a-z0-9]/gi, '_');
        const outputPath = path.join(dir, `${safeName}_Report.pdf`);

        try {
            await imagesToPdf(files, outputPath);
            console.log(`✅ PDF generated: ${outputPath}`);
        } catch (err: any) {
            // Ignora apenas erros relacionados ao arquivo temporário 0.pdf 
            // para permitir que o teste continue mesmo com conflito de workers
            if (err?.message?.includes('0.pdf') || err?.path?.includes('0.pdf')) {
                console.warn(`⚠️ PDF Worker Conflict ignored for: ${testName}`);
            } else {
                console.error(`❌ PDF Error: ${err.message}`);
            }
        }
    }
}