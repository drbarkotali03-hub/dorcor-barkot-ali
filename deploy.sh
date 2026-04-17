#!/usr/bin/env bash

# Quick Deployment Commands

echo "🚀 Dr. Barkot Ali Website - Vercel Deployment Setup"
echo "=================================================="
echo ""

# Step 1: Commit changes
echo "Step 1: Committing changes to git..."
git add .
git commit -m "Setup Vercel deployment - Firebase env config ready"
git push origin main

echo "✅ Pushed to GitHub!"
echo ""
echo "Step 2: Go to Vercel..."
echo "Visit: https://vercel.com/dashboard"
echo "1. Click 'Add New' → 'Project'"
echo "2. Search for: dorcor-barkot-ali"
echo "3. Click 'Import'"
echo ""
echo "Step 3: Environment Variables (if using Firebase)..."
echo "Firebase Console → Project Settings → Web Config"
echo "Copy values to Vercel Dashboard → Settings → Environment Variables"
echo ""
echo "✅ Your project is ready for deployment!"
