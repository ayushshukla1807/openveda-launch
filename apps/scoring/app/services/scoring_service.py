from pydantic import BaseModel
from typing import List, Dict

class GitHubData(BaseModel):
    commits_last_90_days: int
    prs_merged: int
    issues_closed: int
    starred_repos: int
    languages: List[str]
    target_stack: List[str]
    avg_pr_size: int
    active_days: int

class ScoringService:
    @staticmethod
    def normalize(value: float, max_value: float) -> float:
        return min(value / max_value, 1.0)

    @staticmethod
    def calculate_tech_stack_score(user_langs: List[str], target_stack: List[str]) -> float:
        if not target_stack:
            return 1.0
        match = len(set(user_langs) & set(target_stack))
        return match / len(target_stack)

    def calculate_readiness_score(self, data: GitHubData) -> Dict:
        # 1. Contribution Frequency (30%)
        freq_score = self.normalize(data.commits_last_90_days, 300)

        # 2. Repo Quality (25%) - PRs (+ stars)
        quality_score = (
            self.normalize(data.prs_merged, 50) * 0.6 +
            self.normalize(data.starred_repos, 20) * 0.4
        )

        # 3. Tech Stack Alignment (20%)
        stack_score = self.calculate_tech_stack_score(data.languages, data.target_stack)

        # 4. Complexity (15%) - PR size heuristic
        complexity_score = self.normalize(data.avg_pr_size, 500)

        # 5. Consistency (10%)
        consistency_score = self.normalize(data.active_days, 90)

        final_score = (
            freq_score * 0.30 +
            quality_score * 0.25 +
            stack_score * 0.20 +
            complexity_score * 0.15 +
            consistency_score * 0.10
        ) * 100

        # Tier categorization logic
        tier = "Beginner"
        is_certified = False
        
        if final_score >= 85:
            tier = "Certified"
            is_certified = True
        elif final_score >= 51:
            tier = "Intermediate"
        
        return {
            "score": round(final_score, 2),
            "tier": tier,
            "is_certified": is_certified,
            "breakdown": {
                "frequency": round(freq_score, 2),
                "quality": round(quality_score, 2),
                "stack": round(stack_score, 2),
                "complexity": round(complexity_score, 2),
                "consistency": round(consistency_score, 2)
            }
        }
