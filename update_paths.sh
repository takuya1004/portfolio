#!/bin/bash

# Backup original files
mkdir -p backup
for file in *.html; do
  cp "$file" "backup/$file.bak"
done

# Update image paths in HTML files
for file in *.html; do
  echo "Updating $file..."
  
  # Update anime images
  for i in {1..8}; do
    sed -i '' "s|images/anime/[^\"]*anime${i}[^\"]*\.png|images/anime/anime_$(printf "%02d" $i).png|gI" "$file"
  done
  
  # Update fantasy images
  for i in {1..11}; do
    sed -i '' "s|images/fantasy/[^\"]*fantasy${i}[^\"]*\.png|images/fantasy/fantasy_$(printf "%02d" $i).png|gI" "$file"
  done
  
  # Update illustration images
  for i in {1..6}; do
    sed -i '' "s|images/illustration/[^\"]*illustration${i}[^\"]*\.png|images/illustration/illustration_$(printf "%02d" $i).png|gI" "$file"
  done
  
  # Update landscape images
  for i in {1..8}; do
    sed -i '' "s|images/landscape/[^\"]*landscape${i}[^\"]*\.png|images/landscape/landscape_$(printf "%02d" $i).png|gI" "$file"
  done
  
  # Update portrait images
  for i in {1..8}; do
    sed -i '' "s|images/portrait/[^\"]*portrait${i}[^\"]*\.png|images/portrait/portrait_$(printf "%02d" $i).png|gI" "$file"
  done
  
  # Update sf images
  for i in {1..6}; do
    sed -i '' "s|images/sf/[^\"]*sf${i}[^\"]*\.png|images/sf/sf_$(printf "%02d" $i).png|gI" "$file"
  done
  
  # Update top images
  for i in {1..3}; do
    sed -i '' "s|images/top/[^\"]*top${i}[^\"]*\.png|images/top/top_$(printf "%02d" $i).png|gI" "$file"
  done
  
done

echo "All HTML files have been updated. Original files are backed up in the 'backup' directory."
