---
slug: "ml-grade-control"
locale: "en"
title: "From drill hole to block model: machine learning for grade control"
description: "How machine learning can support domaining and grade estimation alongside conventional geostatistics, and why geologists stay accountable."
date: "2026-09-15"
authorRole: "Senior Resource Geologist"
tags: ["ai", "geology"]
cover: "../../../assets/images/ai-geology-pit.jpg"
coverAlt: "Aerial view of a terraced open-pit mine"
draft: true
---

A resource model is only as good as the drilling behind it. Between drill holes, geologists interpret domains and estimate grades, and every interpretation carries uncertainty that flows into mine plans, grade control and, ultimately, what goes to the mill.

## Where machine learning helps

Machine learning is not a replacement for geostatistics. It is useful where geologists face large, multi-variable datasets and repetitive judgement calls:

- **Domaining**: classifying lithology, alteration or mineralisation style from assay, geophysical and logging data, so domain boundaries are consistent from hole to hole.
- **Data validation**: flagging assays, collars or downhole surveys that look inconsistent with their neighbours before they reach the model.
- **Estimation support**: running data-driven estimates alongside kriging to highlight areas where the two disagree and deserve a closer look.

## Keeping uncertainty visible

Any estimate between drill holes is uncertain. We report that uncertainty explicitly, with confidence maps and alternative scenarios, rather than hiding it inside a single "best" model. Mine planners can then see where extra drilling would change decisions and where it would not.

## Geologists stay in charge

In Australia, public reporting of Mineral Resources and Ore Reserves follows the JORC Code, which requires reports to be based on the work of a Competent Person. Machine learning does not change that. Our workflow keeps every model step documented and reviewable so the Competent Person can understand, test and sign off the result, or reject it.

## A practical workflow

1. Audit the drilling, assay and logging database and fix what can be fixed.
2. Agree the domains and variables that matter for the deposit and the mining method.
3. Train and cross-validate models, holding back whole drill holes to test honestly.
4. Compare with the conventional estimate and investigate every significant difference.
5. Hand over block-model inputs, uncertainty maps and a validation report.

The goal is not a more complex model. It is a model the geology team trusts more, because they can see why it says what it says.

*Sources: Australasian Code for Reporting of Exploration Results, Mineral Resources and Ore Reserves (JORC Code), 2012 edition (jorc.org).*
