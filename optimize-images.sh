#!/bin/bash

# 必要なツールがインストールされているか確認
if ! command -v cwebp &> /dev/null; then
    echo "cwebp がインストールされていません。Homebrewでインストールします..."
    brew install webp
fi

# 画像を最適化する関数
optimize_images() {
    local dir=$1
    echo "$dir ディレクトリの画像を最適化中..."
    
    # 元のディレクトリ構造を維持してWebPに変換
    find "$dir" -type f \( -iname "*.png" -o -iname "*.jpg" -o -iname "*.jpeg" \) | while read -r img; do
        # 元のディレクトリ構造を取得
        dir_path=$(dirname "$img")
        file_name=$(basename -- "$img")
        name_no_ext="${file_name%.*}"
        
        # WebPに変換（既存のファイルは上書きしない）
        if [ ! -f "${dir_path}/${name_no_ext}.webp" ]; then
            echo "変換中: $img"
            cwebp -q 80 "$img" -o "${dir_path}/${name_no_ext}.webp"
        fi
    done
}

# 各サブディレクトリの画像を最適化
for dir in images/*/; do
    if [ -d "$dir" ]; then
        optimize_images "$dir"
    fi
done

echo "画像の最適化が完了しました！"
