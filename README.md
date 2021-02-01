# Nowsecure Report Parser

This repo takes advantage of [Nowsecure's REST API ](https://docs.nowsecure.com/auto/api/spec/#api-Account) in order to retrieve the report's findings for the given platforms. Since the ultimate goal is to use the output of that application as an input to the [Jira Server Integration Action](https://github.com/camelotls/actions-jira-integration), the report's JSON will be reformatted in order to retrieve the following data:

- vulnerabilityName
- issueSummary
- issueDescription
- issueSeverity
