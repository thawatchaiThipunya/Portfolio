import { createClient } from '@supabase/supabase-js';
import sharp from 'sharp'; 

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! 
);

export const uploadBackendService = {
  async uploadFile(file: File) {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const { data: buckets } = await supabase.storage.listBuckets();
    console.log("🔍 My Buckets in Supabase:", buckets?.map(b => b.name));
    
    
    const optimizedBuffer = await sharp(buffer)
      .resize(1024, null, { 
        withoutEnlargement: true, 
        fit: 'inside'
      })
      .webp({ quality: 80 }) 
      .toBuffer();
    

    const fileName = `uploads/${Date.now()}-${file.name.split('.')[0]}.jpg`; 

    const { error } = await supabase.storage
      .from('portfolio')
      .upload(fileName, optimizedBuffer, { 
        contentType: 'image/webp',
        upsert: true
      });

    if (error) throw error;

    const { data: { publicUrl } } = supabase.storage
      .from('portfolio')
      .getPublicUrl(fileName);

    return publicUrl;
  }
};