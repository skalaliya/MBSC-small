---
slug: 'ml-grade-control'
locale: 'fr'
title: 'Du sondage au modèle de blocs : l’apprentissage automatique au service du contrôle des teneurs'
description: 'Comment l’apprentissage automatique soutient le domaining et l’estimation des teneurs aux côtés de la géostatistique, sous la responsabilité du géologue.'
date: '2026-09-15'
authorRole: 'Géologue senior, estimation des ressources'
tags: ['ai', 'geology']
cover: '../../../assets/images/ai-geology-pit.jpg'
coverAlt: 'Vue aérienne d’une mine à ciel ouvert en gradins'
draft: false
---

Un modèle de ressources ne vaut que par les sondages qui le fondent. Entre deux sondages, les géologues interprètent les domaines et estiment les teneurs, et chaque interprétation comporte une incertitude qui se répercute sur la planification minière, le contrôle des teneurs et, au bout du compte, sur ce qui part à l’usine.

## Là où l’apprentissage automatique aide

L’apprentissage automatique ne remplace pas la géostatistique. Il est utile face à de grands jeux de données multivariées et à des décisions répétitives :

- **Domaining** : classer lithologie, altération ou style de minéralisation à partir des analyses, de la géophysique et des descriptions, pour des limites de domaines cohérentes d’un sondage à l’autre.
- **Validation des données** : repérer les analyses, têtes de sondage ou mesures de déviation incohérentes avec leurs voisines avant qu’elles n’entrent dans le modèle.
- **Aide à l’estimation** : produire des estimations fondées sur les données en parallèle du krigeage pour signaler les zones où les deux divergent et méritent un examen.

## Rendre l’incertitude visible

Toute estimation entre sondages est incertaine. Nous la présentons explicitement, avec des cartes de confiance et des scénarios alternatifs, plutôt que de la masquer dans un modèle « optimal » unique. Les planificateurs voient alors où des sondages supplémentaires changeraient les décisions, et où ils ne changeraient rien.

## Le géologue garde la main

En Australie, la publication des Ressources minérales et des Réserves de minerai suit le Code JORC, qui exige que les rapports reposent sur le travail d’une Personne compétente. L’apprentissage automatique n’y change rien. Notre méthode documente chaque étape du modèle et la rend vérifiable, pour que la Personne compétente puisse comprendre, tester et valider le résultat, ou le rejeter.

## Une démarche concrète

1. Auditer la base de sondages, d’analyses et de descriptions, et corriger ce qui peut l’être.
2. Convenir des domaines et variables pertinents pour le gisement et la méthode d’exploitation.
3. Entraîner les modèles et les valider par validation croisée, en retirant des sondages entiers pour un test honnête.
4. Comparer avec l’estimation classique et analyser chaque écart significatif.
5. Remettre les données du modèle de blocs, les cartes d’incertitude et un rapport de validation.

L’objectif n’est pas un modèle plus complexe, mais un modèle auquel l’équipe géologique fait davantage confiance, parce qu’elle comprend ce qu’il dit et pourquoi.

_Source : Code australasien de déclaration des résultats d’exploration, des Ressources minérales et des Réserves de minerai (Code JORC), édition 2012 (jorc.org)._
