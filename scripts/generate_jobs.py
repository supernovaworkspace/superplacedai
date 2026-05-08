import pandas as pd
import sys
import json
import ast

sys.stdout.reconfigure(encoding='utf-8')

df = pd.read_csv(
    r'C:\Users\Mohith Kumar S\.cache\kagglehub\datasets\abhaykumar2812\ai-and-ml-jobs\versions\1\final_job_list.csv',
    encoding='latin-1'
)

# Clean + deduplicate
df = df.drop_duplicates(subset=['Title', 'Company'])
df = df.dropna(subset=['Title', 'Company', 'Location', 'Salary'])


def parse_skills(s):
    try:
        lst = ast.literal_eval(str(s))
        return [x.strip().title() for x in lst if x.strip()]
    except:
        return []


def salary_range(val):
    try:
        v = float(val)
        low = int(v * 0.9)
        high = int(v * 1.1)
        return f"${low // 1000}k - ${high // 1000}k"
    except:
        return "$80k - $120k"


def monthly(val):
    try:
        v = float(val)
        return f"${int(v / 12):,}/mo"
    except:
        return "$6,000/mo"


jobs = []
for i, (_, row) in enumerate(df.iterrows()):
    skills = parse_skills(row['Identified_Skills'])
    jobs.append({
        'id': f'job-{i + 1}',
        'job_title': str(row['Title']).strip(),
        'company_name': str(row['Company']).strip(),
        'location': str(row['Location']).strip(),
        'job_type': str(row['Type of Positions']).strip(),
        'salary_range': salary_range(row['Salary']),
        'monthly_earnings': monthly(row['Salary']),
        'required_skills': skills,
        'match_score': min(99, max(60, 70 + (len(skills) * 3) + (i % 20))),
        'skill_overlap': skills[:3] if skills else [],
        'missing_skills': skills[3:5] if len(skills) > 3 else [],
        'hired_count': 8 + (i % 30),
        'job_link': 'https://www.linkedin.com/jobs/'
    })

out_path = r'd:\SuperPlaced AI\superplacedai\public\kaggle_jobs.json'
with open(out_path, 'w', encoding='utf-8') as f:
    json.dump(jobs[:80], f, indent=2, ensure_ascii=False)

print(f"Written {min(80, len(jobs))} jobs to {out_path}")
