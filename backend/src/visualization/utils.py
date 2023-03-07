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
        