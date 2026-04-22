const fs = require('fs');
const path = require('path');

// Fix TypeScript compilation issues by temporarily modifying the files
const mainToolPath = path.join(__dirname, '../src/components/common/MainTool.tsx');

console.log('Fixing TypeScript compilation issues...');

try {
  let content = fs.readFileSync(mainToolPath, 'utf8');
  
  // Replace the problematic getFieldClasses calls with a simpler approach
  content = content.replace(
    /className={getFieldClasses\(hasError, isFocused, theme, isLoading as any\)}/g,
    'className={getFieldClasses(hasError, isFocused, theme, Boolean(isLoading))}'
  );
  
  fs.writeFileSync(mainToolPath, content);
  console.log('TypeScript issues fixed successfully!');
} catch (error) {
  console.error('Error fixing TypeScript issues:', error);
  process.exit(1);
}
