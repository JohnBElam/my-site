---
layout: post
title: "You Already Have Data. It Lives in Frank."
date: 2026-10-20
excerpt: "Clients ask how you start without data. You do what you were going to do anyway. Then you tell the computer."
author: John Brandon Elam
tags: [decision-systems, priors, supply-chain, judgment]
---

## The Question

"But how do you start if you don't have data?"

Clients ask me this. Colleagues ask me this. People who should know better ask me this.

The answer is frustratingly simple.

You do what you were going to do anyway. Then you tell the computer.

That sounds simple because it is. It is also easy to mess up. So let's walk through it.

## Meet Frank

Every company has a Frank.

Frank orders a part. He does it with a few Excel sheets and years of intuition. This cycle, Frank orders 60.

Ask him why and you get a real answer. He expects demand somewhere between 40 and 70. He knows running out costs more than having extra. A stockout means expedited freight, an angry customer, maybe a stopped line. Overstock means a few pallets sitting in the corner for a month. So he leans high. 60 feels right.

Frank will tell you he doesn't have a model.

He has two.

## Two Things Are Hiding in That 60

The first is a belief. Demand will land somewhere between 40 and 70. That range is your prior: what you believe before the next round of evidence shows up. It's one of two new words in this piece. Both are worth learning.

The second is a decision rule. When running out hurts more than holding extra, order toward the high side of the range. That's a policy. Frank built it over years, under calm conditions, and it runs every time the pressure shows up.

60 is not the prior. 60 is what the policy does with the prior.

Keep them separate. This is where most "we have no data" efforts go wrong. They record 60 and call it the answer. A system that learns "the answer is 60" breaks the first time demand moves. A system that learns "demand is 40 to 70, and stockouts cost more" adapts.

Notice what you needed to get here. Not a data lake. A conversation with Frank. Name the decision first. The data comes after.

## Then You Let It Learn

Now the computer has a starting point. Each cycle, actual demand comes in. The system updates its belief. The updated belief is the posterior. That's the second new word. You've hit your quota.

Next cycle, the system shows Frank a recommendation. Frank does one of two things.

He accepts it. Fine.

Or he adjusts it and records why. "Customer called, promo next week." "Supplier is shaky, I want cover."

That override is not the system failing. It's a datapoint. It goes back into the forecast and the decision model like everything else. The system remembers it. Next time, it knows a little more about demand and a little more about Frank.

Run that loop for a few cycles and look around. You have data now. Data about demand, and data about Frank's judgment, which is the part nobody else has.

Adam DeJans Jr. and I lay out the architecture behind this loop, including where the person sits and how what they know gets written down instead of lost, in Paper 04 of The Decision Factory series.

## Now Frank Quits

No handoff. No notes. Just gone.

This is not hypothetical. I worked with a guy, not named Frank, who did exactly this job. When he left, the company was upset and confused. They hired two people to replace him. Ask either of them why they ordered what they ordered and you got a shrug. Two salaries. Less confidence than one.

Everything Frank knew walked out with him. The range. The lean. The reasons. None of it was written down, because nobody thought of it as data.

If the loop had been running, most of Frank would still be in the building.

But it wasn't. So ask the same question as before. What were you going to do anyway?

Probably one of two things. Find the nearest Frank-like person and ask them. Or form a committee.

If you find someone Frank-adjacent, great. Do everything above. Get their range. Get their lean. Start the loop.

If you form a committee, keep reading.

## The Committee Is Your Prior

Committees get mocked, mostly fairly. But a committee has one thing a single Frank doesn't: disagreement. Disagreement is uncertainty you can see. Use it.

Ask everyone two questions.

1. What do you expect demand to be? Not what should we order. What will happen.
2. What hurts more, running out or having extra?

The first question gets you the range. The second gets you the lean. Same separation as before. Belief in one hand, policy in the other.

Now trim the votes. If you have more than six people, throw out the highest and the lowest. What's left is your starting range.

Say seven people answer 35, 45, 48, 52, 55, 62, and 90. Drop the 35 and the 90. Your prior is 45 to 62.

Why drop the extremes? Every room has one person anchored on last year's disaster and one anchored on the sales pitch. You want them in the room arguing. You don't want them setting the edges.

Then run the same loop. The committee doesn't have to be right. It has to give the system a starting point it can correct.

## We Are Doing Art, People

Someone will read this and object. "A trimmed committee vote is not a prior. Where's the elicitation protocol? Where's the validation?"

This is not hard science. Nobody gets a clean experiment. Demand comes from people making decisions you can't see, in a market that moves while you measure it. Anyone waiting for the rigorous version before they start is on a long journey to nowhere.

And the rigor crowd is mostly doing theater.

Look at what passes for rigor in a typical supply chain. A 95% service level nobody derived. A forecast reported to two decimal places off eleven months of history. A safety stock formula that assumes smooth, normal demand for a part that sells three units, then zero, then forty. Paper 02 of The Decision Factory series makes the cost plain: on the same data, a blanket service-level target routinely costs about a third more than the economic optimum it stands in for.

That isn't precision. It's false precision. It's worse than an honest range, because it hides the uncertainty instead of admitting it.

Frank's "40 to 70" is more honest than most of those numbers. It says out loud what it doesn't know.

The rigor that matters comes after you start. Price the errors. Measure whether the decisions got better. Test the system against history you already lived. That's real rigor. Demanding it before day one is just a sophisticated way to never begin.

## Start

You have data. It's in Frank's head, in the committee's argument, in the spreadsheet nobody trusts.

Write down the range. Write down the lean. Make the decision you were going to make anyway.

Then tell the computer.
