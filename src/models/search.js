import axios from "axios";

const search = {
    state: {
        searchList: [],
        cache: {},
        commitHistory: {},
        commitColors: {}
    },
    reducers: {
        setSearchList: (state, searchList) => ({
            ...state,
            searchList
        }),
        setCache: (state, cacheObj) => ({
            ...state,
            cache: {
                ...state.cache,
                [cacheObj.key]: cacheObj.value
            }
        }),
        setCommitHistory: (state, commitHistory) => ({
            ...state,
            commitHistory: {
                ...state.commitHistory,
                [commitHistory.key]: commitHistory.data
            },
            commitColors: {
                ...state.commitColors,
                [commitHistory.key]: commitHistory.color
            }
        }),
        updateCommitHistory: (state, commitHistory) => ({
            ...state,
            commitHistory
        }),
    },
    effects: (dispatch) => ({
        async loadSearchList(searchStr, state) {
            if (!searchStr) {
                this.setSearchList([]);
            } else if (state.search.cache[searchStr]) {
                this.setSearchList(state.search.cache[searchStr]);
            } else {
                let resp = await axios.get(`https://api.github.com/search/repositories?q=${searchStr}&order=desc`);
                if (resp.data.items) {
                    const searchList = resp.data.items.map(item => ({
                        id: item.id,
                        label: item.full_name,
                        pushedAt: item.pushed_at,
                        owner: item.owner.login,
                        name: item.name
                    }));
                    this.setCache({key: searchStr, value: searchList });
                    this.setSearchList(searchList);
                }
            }
        },

        async getCommitHistory(repo, state) {
            try {
                let resp = await axios.get(`https://api.github.com/repos/${repo.owner}/${repo.name}/stats/commit_activity`);
                if (resp.data) {
                    await this.setCommitHistory({key: repo.id, data: resp.data, color: repo.color });
                } else {
                    await this.setCommitHistory({key: repo.id, data: [], color: repo.color });
                }
            } catch (err) {

            }
        }
    })
}

export default search;
