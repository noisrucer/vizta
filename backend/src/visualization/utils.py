def build_gpa_resp(group_name: str, grades: dict):
    """
    group: A, B, C, D, F
    letters = {
        "A+": {
            "count": 68,
            "color": "hsl(132, 70%, 50%)"
        }
    }
    """
    # print(group)
    # print(grades)
    
    resp = {
        "group": f"{group_name} group" if group_name != 'F' else "Fail",
    }
    for grade, info in grades.items():
        cnt = info['count']
        color = info['color']
        resp[grade] = cnt
        resp[f"{grade}Color"] = color
        
    return resp
        
        
def get_gpa_badge(average):
    average *= (5.0 / 4.3)
    if average == None:
      return "None";
    elif average == 0: 
      return "Avg: F"
    elif average <= 1.1627906976744187:
      return "Avg: D"
    elif average <= 1.5116279069767442:
      return "Avg: D+"
    elif average <= 1.9767441860465118:
      return "Avg: C-"
    elif average <= 2.3255813953488373:
      return "Avg: C"
    elif average <= 2.674418604651163:
      return "Avg: C+"
    elif average <= 3.1395348837209305:
      return "Avg: B-"
    elif average <= 3.488372093023256:
      return "Avg: B"
    elif average <= 3.8372093023255816:
      return "Avg: B+"
    elif average <= 4.302325581395349:
      return "Avg: A-"
    elif average <= 4.651162790697675:
      return "Avg: A"
    else:
      return "Avg: A+"