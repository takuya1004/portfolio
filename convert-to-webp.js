const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { glob } = require('glob');

// 変換対象の画像形式
const IMAGE_EXTENSIONS = ['png', 'jpg', 'jpeg'];
const QUALITY = 80; // 画質 (0-100)

// 画像を変換する関数
async function convertToWebP(inputPath, outputPath) {
  try {
    await sharp(inputPath)
      .webp({ quality: QUALITY })
      .toFile(outputPath);
    console.log(`✅ 変換完了: ${inputPath} -> ${outputPath}`);
    return true;
  } catch (error) {
    console.error(`❌ 変換エラー (${inputPath}):`, error.message);
    return false;
  }
}

// メイン処理
async function main() {
  console.log('画像のWebP変換を開始します...');
  
  // 画像ファイルを再帰的に検索
  const imagePatterns = IMAGE_EXTENSIONS.map(ext => `images/**/*.${ext}`);
  const imageFiles = await glob(imagePatterns, { nodir: true });
  
  console.log(`合計 ${imageFiles.length}件の画像を処理します`);
  
  let successCount = 0;
  
  // 各画像を処理
  for (const imagePath of imageFiles) {
    const dirName = path.dirname(imagePath);
    const fileName = path.basename(imagePath, path.extname(imagePath));
    const outputPath = path.join(dirName, `${fileName}.webp`);
    
    // 既にWebPファイルが存在する場合はスキップ
    if (fs.existsSync(outputPath)) {
      console.log(`ℹ️ スキップ: ${outputPath} は既に存在します`);
      continue;
    }
    
    // 変換を実行
    const success = await convertToWebP(imagePath, outputPath);
    if (success) successCount++;
  }
  
  console.log(`\n✨ 変換完了: ${successCount}/${imageFiles.length}件の画像をWebPに変換しました`);
}

// スクリプトを実行
main().catch(console.error);
