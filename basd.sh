#!/bin/bash
set -e

# Configuration
REPO_NAME="fuels-wallet-fork"
BRANCH_NAME="test/bacon-wallet-release-$(date +%s)"
COMMIT_MESSAGE="feat: update branding to Bacon Wallet"
PR_TITLE="Bacon Wallet Branding"
PR_BODY="Testing the changeset and release workflow."

echo "🥓 Starting Bacon Wallet Release Test"

# Step 1: Checkout master and create new branch
echo "Creating branch: $BRANCH_NAME"
git checkout master
git pull
git checkout -b "$BRANCH_NAME"

# Step 2: Make a change
echo "Making test changes..."
echo "# Bacon Wallet" > README.md
git add README.md

# Step 3: Create a changeset (non-interactive)
echo "Creating changesets..."

# Main app changeset
cat > .changeset/bacon-wallet-$(date +%s).md << EOF
---
"@nelitow-fuel/fuels-wallet": minor
---

## Bacon Wallet Rebranding

- Changed app name to Bacon Wallet
- Updated icons and logos with bacon-themed designs
- Enhanced UI color scheme with bacon-inspired colors
EOF

# Types package changeset
cat > .changeset/types-update-$(date +%s).md << EOF
---
"@nelitow-fuel/types": patch
---

### Types Package Updates

- Added new transaction type definitions
- Fixed type compatibility with latest Fuel SDK
- Improved documentation for complex types
EOF

# Connections package changeset
cat > .changeset/connections-update-$(date +%s).md << EOF
---
"@nelitow-fuel/connections": patch
---

#### Connections Package Enhancements

*   Refactored connection logic for better performance.
*   Added support for new connection protocols.

**Note:** This is a patch update.
EOF

# Playwright Utils changeset
cat > .changeset/playwright-utils-$(date +%s).md << EOF
---
"@nelitow-fuel/playwright-utils": patch
---

##### Playwright Utilities Fixes

- Resolved an issue with screenshot capture on specific devices.
- Updated utility functions to align with Playwright v1.46.1.
EOF

git add .changeset/

# Step 4: Commit and push
echo "Committing and pushing changes..."
git commit -m "$COMMIT_MESSAGE"
git push -u origin "$BRANCH_NAME"

# Step 5: Create PR with gh CLI if available
if command -v gh &> /dev/null; then
    echo "Creating PR using GitHub CLI..."
    gh pr create --title "$PR_TITLE" --body "$PR_BODY" --base master
    
    # Get the PR number
    PR_NUMBER=$(gh pr view --json number -q .number)
    echo "PR created: #$PR_NUMBER"
    
    echo "Merging PR..."
    gh pr merge $PR_NUMBER --merge --delete-branch
    
    # Wait for changeset PR to be created
    echo "Waiting for changeset PR to be created..."
    MAX_WAIT=300  # 5 minutes
    WAIT_INTERVAL=10
    ELAPSED=0
    
    while [ $ELAPSED -lt $MAX_WAIT ]; do
        # Check for changeset PR
        CHANGESET_PR=$(gh pr list --search "ci(changesets): versioning packages" --json number -q .[0].number)
        
        if [ -n "$CHANGESET_PR" ]; then
            echo "Changeset PR found: #$CHANGESET_PR"
            
            echo "Merging changeset PR..."
            gh pr merge $CHANGESET_PR --merge
            
            echo "✅ Test complete! Check the Actions tab for release workflow progress."
            echo "Release should appear at: https://github.com/$(gh repo view --json nameWithOwner -q .nameWithOwner)/releases"
            exit 0
        fi
        
        echo "Waiting for changeset PR... ($ELAPSED/$MAX_WAIT seconds)"
        sleep $WAIT_INTERVAL
        ELAPSED=$((ELAPSED + WAIT_INTERVAL))
    done
    
    echo "❌ Timed out waiting for changeset PR."
else
    echo "GitHub CLI not found. Please manually create and merge the PR at:"
    echo "https://github.com/$(git remote get-url origin | sed 's/.*github.com[:\/]\(.*\)\.git/\1/')/pull/new/$BRANCH_NAME"
    echo ""
    echo "After merging, wait for the changeset PR to be created and merge it too."
fi

echo "🏁 Initial setup complete!"