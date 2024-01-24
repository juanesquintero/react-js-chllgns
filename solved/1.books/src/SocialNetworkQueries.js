export class SocialNetworkQueries {

    constructor({ fetchCurrentUser }) {
        this.fetchCurrentUser = fetchCurrentUser;
        this.cache = null;
    }

    async findPotentialInterests(minimalScore = 0.5) {
        let user;
        try {
            user = await this.fetchCurrentUser();
            this.cache = user;
        } catch (error) {
            if (this.cache) {
                user = this.cache;
            } else {
                return [];
            }
        }

        if (!user.friends || user.friends.length === 0) {
            return [];
        }

        const ratedBooks = new Set(user.ratings?.map(rating => rating.title));
        const scores = new Map();

        user.friends?.forEach(friend => {
            friend.ratings?.forEach(rating => {
                if (!ratedBooks.has(rating.title)) {
                    if (!scores.has(rating.title)) {
                        scores.set(rating.title, []);
                    }
                    scores.get(rating.title).push(rating.score);
                }
            });
        });

        const interests = Array.from(scores)
            .map(([title, scores]) => ({ title, averageScore: scores.reduce((a, b) => a + b, 0) / scores.length }))
            .filter(book => book.averageScore >= minimalScore)
            .sort((a, b) => b.averageScore - a.averageScore || a.title.localeCompare(b.title, "en", { sensitivity: "base" }));

        return interests.map(book => book.title);
    }
}
