
```mermaid
%%{init: { 'theme': 'base', 'gitGraph': {'showBranches': true, 'showCommitLabel': true}} }%%
gitGraph
    commit id: "Initial"
    branch develop
    checkout develop
    commit id: "Setup"
    
    branch feature/login
    checkout feature/login
    commit id: "Add login UI"
    commit id: "Add auth logic"
    commit id: "Add tests"
    checkout develop
    merge feature/login tag: "Squash" type: HIGHLIGHT
    
    branch feature/payment
    checkout feature/payment
    commit id: "Payment API"
    commit id: "Payment UI"
    checkout develop
    merge feature/payment tag: "Squash"
    
    commit id: "Integration"
    
    checkout main
    merge develop tag: "Release v1.0" type: REVERSE
    checkout develop
    merge main tag: "Sync v1.0" type: HIGHLIGHT
    
    branch hotfix/critical
    checkout hotfix/critical
    commit id: "Fix bug"
    checkout main
    merge hotfix/critical tag: "Hotfix"
    
    checkout develop
    merge hotfix/critical tag: "Sync hotfix"
    
    branch feature/dashboard
    checkout feature/dashboard
    commit id: "Dashboard"
    commit id: "Widgets"
    checkout develop
    merge feature/dashboard tag: "Squash"
    
    commit id: "Ready v1.1"
    
    checkout main
    merge develop tag: "Release v1.1" type: REVERSE
    checkout develop
    merge main tag: "Sync v1.1" type: HIGHLIGHT
