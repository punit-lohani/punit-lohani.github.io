---
layout: post
title: "Statistical Significance Isn’t Enough"
category: Experimentation
read_time: 6 min read
summary: "A practical framework for deciding whether an A/B test result is a product win."
---

An A/B test can produce a statistically significant result and still be the wrong product decision.

That is not a criticism of statistics. It is a reminder that an experiment is a decision-making tool, not a p-value generator. The real question is rarely “Did the metric move?” It is “Should we ship this change?”

## Start with the decision

Before running an experiment, write down the decision you expect to make. A useful template is:

> If the new experience improves the primary metric by at least **X%**, does not harm our guardrails beyond **Y%**, and can be implemented at a reasonable cost, we will ship it.

This forces clarity on three things: the desired outcome, the acceptable downside, and what counts as meaningful impact.

## Use a primary metric and guardrails

Choose one primary metric that represents the behavior the change is designed to improve. For an onboarding experiment, that might be completed activation.

Then choose guardrail metrics that protect against an attractive but harmful local win. Depending on the product, guardrails might include:

- Downstream retention or repeat usage
- Refund, decline, or support-contact rate
- Customer trust and safety signals
- Latency or reliability
- Revenue quality rather than raw volume

A primary metric tells you whether the change worked. Guardrails tell you whether it worked responsibly.

## Look at effect size, not only significance

A small effect can become statistically significant with enough users. That does not make it valuable.

Pair the p-value or confidence interval with the absolute and relative effect:

- What is the change in actual customer outcomes?
- Is the result large enough to matter against the team’s goals?
- Is the expected impact worth the engineering, operational, and opportunity cost?

A 0.1% increase in conversion may be meaningful for a high-volume, low-cost change. The same result may not justify a multi-quarter rebuild.

## Treat segments as explanations, not fishing expeditions

Segment analysis is powerful when it is planned. It becomes risky when teams search across dozens of cuts until one appears significant.

Pre-specify the segments that matter—for example, new versus returning customers, platform, market, or payment method. Use post-test exploration to generate hypotheses, then validate consequential findings in a follow-up experiment.

## End with a decision memo

A good experiment readout should make the recommendation easy to understand:

1. **Decision:** Ship, iterate, hold, or stop.
2. **Primary result:** What changed and by how much?
3. **Guardrails:** What did not change, or what tradeoff emerged?
4. **Confidence and limitations:** What uncertainty remains?
5. **Next step:** Who owns the follow-up and when?

The most useful experiment is not the one with the smallest p-value. It is the one that helps a team make a better product decision.
