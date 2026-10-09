# Evidence capture

Run the API (`npm start`) first. In a second terminal:

- Git Bash: `bash evidence/capture-evidence.sh`
- PowerShell: `.\evidence\capture-evidence.ps1`

The scripts write actual local API responses to `evidence/output/`. Review these files before submitting. They do not create `githubrepo`, because that file must show your real fork relationship.

To capture the fork proof after you fork the starter repository, run (replace `YOUR-USERNAME`):
```bash
curl -sS https://api.github.com/repos/YOUR-USERNAME/expressBookReview > evidence/output/githubrepo
```
Then open the saved file and confirm `parent.full_name` is `ibm-developer-skills-network/expressBookReview`. If GitHub returns an API error, check the repository URL and your access; do not submit an error response as fork proof.
