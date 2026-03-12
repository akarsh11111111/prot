#include <iostream>
#include <vector>
#include <queue>
#include <set>
#include <algorithm>
#include <numeric> 
using namespace std;

int main() {
    int N, M;
    cin >> N >> M;

    vector<vector<int>> grid(N, vector<int>(M));
    for (int i = 0; i < N; ++i)
        for (int j = 0; j < M; ++j)
            cin >> grid[i][j];

    vector<vector<set<int>>> gcds(N, vector<set<int>>(M));

    queue<tuple<int, int, int>> q;
    q.push({0, 0, grid[0][0]});
    gcds[0][0].insert(grid[0][0]);

    int dirs[2][2] = {{1, 0}, {0, 1}};

    while (!q.empty()) {
        auto [i, j, g] = q.front();
        q.pop();

        for (auto& d : dirs) {
            int ni = i + d[0], nj = j + d[1];
            if (ni >= N || nj >= M) continue;

            int ngcd = gcd(g, grid[ni][nj]);
            if (!gcds[ni][nj].count(ngcd)) {
                gcds[ni][nj].insert(ngcd);
                q.push({ni, nj, ngcd});
            }
        }
    }

    int maxGCD = 0;
    for (int g : gcds[N-1][M-1])
        maxGCD = max(maxGCD, g);

    cout << maxGCD << endl;

    return 0;
}
