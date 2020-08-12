Que: What do you think are the greatest areas of risk in completing the project?
Ans: Git apis might throw error
{
    "message":"API rate limit exceeded for 70.71.146.59. (But here's the good news: Authenticated requests get a higher rate limit. Check out the documentation for more details.)",
    "documentation_url":"https://developer.github.com/v3/#rate-limiting"
}


Que: What changes/additions would you make to the design?
Ans: 1) for tablet layout search should go to top so that graph can cover 100% width.(I already implemented)
2) we can expand / collapse repo info in the sidebar.
3) Graph should have legends
4) Tooltip commit icon should have color (I already implemented)

Que: List two or three features that you would consider implementing in the future that would add significant value to the project.
Ans: 1) Ability to filter based on timespan 2) Reset filter 3) Just show last 7 weeks data currently and then addd next/ prev arrow to display last 7 weeks or next 7 weeks info.

Que: Are there any clarifying questions you would ask? If you're able to make assumptions about these and continue, please record and share your assumptions
Ans: 
Assumptions: 
1) number displayed next to star icon is `total commits`
2) tooltip should show all repositories commits for hovered week
3) responsiveness should be implemented
