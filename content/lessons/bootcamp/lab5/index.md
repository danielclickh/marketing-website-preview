---
title: "Lab 5: Querying Data"
description: ""
date: 2022-01-19
lastmod: 2022-01-19
draft: false
images: []

---

## 1. 

1. 


    {{< detail-tag >}}
```sql
CREATE TABLE bootcamp.numbers 
ENGINE = MergeTree 
ORDER BY id
AS 
    SELECT 
    char(modulo(rand(),26) + 97) AS id, 
    rand(number) AS value 
    FROM numbers(100000)
```
    {{< /detail-tag >}}


## 2. 


## 3. 

