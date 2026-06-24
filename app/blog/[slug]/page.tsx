import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { BlogPostJsonLd } from "@/components/seo/BlogPostJsonLd";
import { blogPosts, getBlogPostBySlug } from "@/data/blogPosts";
import { siteConfig } from "@/lib/site";

type BlogArticle = {
  intro: string | string[];
  sections: {
    heading: string;
    body?: string;
    paragraphs?: string[];
  }[];
  conclusion?: string[];
  faqs?: {
    question: string;
    answer: string;
  }[];
  relatedSlugs?: string[];
};

const articleContent: Record<string, BlogArticle> = {
  "how-to-calculate-bmi": {
    intro:
      "BMI, or Body Mass Index, is one of the most common ways to estimate whether body weight is in a general range for a given height. It is simple, quick and easy to calculate, which is why it is often used in fitness calculators, health screenings and weight management discussions. However, BMI is only a starting point. It does not directly measure body fat, muscle mass, bone density, fitness level or overall health. For that reason, BMI should be understood as a useful screening number rather than a final judgement about the body.",
    sections: [
      {
        heading: "What BMI means",
        body: "BMI stands for Body Mass Index. It compares body weight with height and gives a single number that can be placed into commonly used categories. The idea is simple: a person who is heavier for a given height will usually have a higher BMI, while a person who is lighter for the same height will usually have a lower BMI. This makes BMI useful for quick comparisons, but it also means that BMI does not explain why a person has a certain weight. Two people with the same BMI can have very different body compositions, activity levels and health backgrounds.",
      },
      {
        heading: "How BMI is calculated",
        body: "In metric units, BMI is calculated by dividing weight in kilograms by height in meters squared. For example, if someone weighs 75 kilograms and is 1.78 meters tall, the calculation is 75 divided by 1.78 squared. The result is the BMI number. In imperial units, BMI uses weight in pounds and height in inches with a conversion factor. A BMI calculator makes this easier because users can enter height and weight directly without manually converting units or writing out the formula.",
      },
      {
        heading: "Common BMI categories",
        body: "BMI results are usually grouped into general categories such as underweight, normal weight, overweight and obesity. These categories are often used as a broad screening tool. A result in the normal range may suggest that weight is within a common reference range for height. A higher or lower result may suggest that more context is needed. These categories can be useful, but they should not be interpreted as a complete health diagnosis. Lifestyle, medical history, training background and body composition all matter.",
      },
      {
        heading: "Why BMI is useful",
        body: "BMI is useful because it is fast, simple and accessible. It does not require special equipment, lab testing or advanced measurements. This makes it helpful for a quick first look at weight status. For a fitness calculator website, BMI can also help users understand one basic body metric before exploring related calculations such as BMR, TDEE, calorie targets or body fat estimates. When used carefully, BMI can be a helpful starting point for planning better habits.",
      },
      {
        heading: "Where BMI can be misleading",
        body: "BMI can be misleading because it only uses height and weight. It does not know how much of that weight comes from muscle, fat, water or bone. Someone with a high amount of muscle may have a higher BMI even if their body fat is not high. On the other hand, someone with a normal BMI may still have low muscle mass or a body fat level that needs more context. This is why BMI should not be the only number used to understand fitness or health.",
      },
      {
        heading: "BMI and muscle mass",
        body: "Muscle mass is one of the biggest reasons BMI can be misunderstood. Muscle is dense, and people who train regularly may weigh more than expected for their height. A strength athlete, for example, may fall into an overweight BMI category while still having a strong and athletic body composition. This does not mean BMI is useless. It means BMI should be interpreted alongside other information, such as waist measurement, training history, progress photos, strength performance and body fat estimates.",
      },
      {
        heading: "BMI and fat distribution",
        body: "BMI also does not show where body fat is stored. Fat distribution can matter because waist size and abdominal fat can provide additional context. Two people may have the same BMI, but one may carry more weight around the waist while the other may have more evenly distributed mass. For this reason, many people use BMI together with waist measurement, body fat percentage estimates or other body metric tools to get a clearer picture.",
      },
      {
        heading: "How to use BMI with other calculators",
        body: "BMI becomes more useful when it is combined with other fitness estimates. After checking BMI, users may want to estimate BMR to understand resting calorie needs, TDEE to estimate daily calorie expenditure, or a calorie calculator to explore maintenance, fat loss or muscle gain targets. BMI can answer one question: how body weight compares with height. Other calculators help answer what daily energy needs may look like and how nutrition goals can be planned.",
      },
      {
        heading: "A practical way to interpret your BMI result",
        body: "The best way to interpret BMI is to treat it as a signal, not a verdict. If the result is higher or lower than expected, it can be a reason to look more closely at habits, measurements and goals. If the result is in a normal range, it can still be useful to think about strength, fitness, nutrition quality and long-term consistency. A healthy lifestyle is not defined by one number. BMI is most helpful when it starts a better conversation about health and fitness rather than ending it.",
      },
      {
        heading: "Use the BMI calculator as a starting point",
        body: "The FitCalcLab BMI Calculator can estimate BMI using metric or imperial units. It can help users quickly understand their result and compare it with common BMI categories. After that, it is a good idea to explore related tools such as the TDEE Calculator, Calorie Calculator or Body Fat Calculator for a broader view. The more context you add, the more useful the result becomes.",
      },
    ],
    faqs: [
      {
        question: "Is BMI accurate for everyone?",
        answer:
          "BMI is not accurate for everyone. It does not directly measure body fat, muscle mass, bone density or fat distribution. It is best used as a quick screening estimate, not as a complete health assessment.",
      },
      {
        question: "What is a healthy BMI range?",
        answer:
          "A commonly used healthy BMI range is around 18.5 to 24.9. However, BMI ranges should be interpreted with personal context, lifestyle, age, muscle mass and medical guidance when needed.",
      },
      {
        question: "Should I use BMI or body fat percentage?",
        answer:
          "BMI is easier to calculate and useful for a quick overview. Body fat percentage can provide more context about body composition, but it also depends on the method used to estimate it.",
      },
      {
        question: "Can BMI be high because of muscle?",
        answer:
          "Yes. People with more muscle mass can have a higher BMI because BMI only uses height and weight. It does not know whether weight comes from muscle or fat.",
      },
    ],
    relatedSlugs: ["bmr-vs-tdee", "how-many-calories-should-i-eat"],
  },

  "bmr-vs-tdee": {
    intro: [
      "BMR and TDEE are two of the most useful calorie numbers for understanding daily energy needs. They are related, but they do not mean the same thing.",
      "BMR estimates how many calories your body burns at rest. TDEE estimates how many calories you burn in a full day after activity, movement and exercise are included.",
      "Understanding the difference between BMR and TDEE can help you make better decisions when using calorie, macro and weight loss calculators.",
    ],
    sections: [
      {
        heading: "What is BMR?",
        paragraphs: [
          "BMR stands for basal metabolic rate. It is an estimate of the energy your body needs to keep basic functions running while at rest.",
          "These basic functions include breathing, blood circulation, body temperature regulation, cell repair and organ function. Even if you stayed in bed all day, your body would still use energy for these processes.",
          "BMR is usually estimated using details such as age, height, weight and sex. Different formulas can give slightly different results, so BMR should be treated as an estimate rather than an exact number.",
        ],
      },
      {
        heading: "What is TDEE?",
        paragraphs: [
          "TDEE stands for total daily energy expenditure. It estimates the total number of calories your body burns in a normal day.",
          "TDEE includes your BMR, but it also includes calories burned through walking, working, training, household activity, digestion and general movement.",
          "Because TDEE includes activity, it is usually higher than BMR. The more active someone is, the larger the difference between BMR and TDEE can become.",
        ],
      },
      {
        heading: "Why BMR and TDEE are different",
        paragraphs: [
          "The main difference is that BMR describes resting energy needs, while TDEE describes total daily energy needs.",
          "For example, two people may have similar BMR values but very different TDEE values if one person is sedentary and the other trains several times per week.",
          "This is why activity level is important when estimating calorie needs. A calorie target based only on BMR can be too low for daily planning because it does not include normal activity.",
        ],
      },
      {
        heading: "Which number should you use for calorie planning?",
        paragraphs: [
          "For most nutrition goals, TDEE is more practical than BMR because TDEE estimates your maintenance calories. Maintenance calories are the calories you would roughly need to maintain your current weight.",
          "If your goal is weight loss, you can estimate a calorie deficit from your TDEE. If your goal is muscle gain or weight gain, you can estimate a calorie surplus from your TDEE.",
          "BMR is still useful because it gives you a baseline. It helps you understand the minimum energy your body is estimated to use at rest, but TDEE is usually the number used for daily calorie targets.",
        ],
      },
      {
        heading: "How activity level changes TDEE",
        paragraphs: [
          "Activity level can make a large difference in TDEE. A sedentary person may have a TDEE only slightly above BMR, while a very active person may burn hundreds or even thousands of additional calories per day.",
          "Most TDEE calculators ask you to choose an activity level such as sedentary, lightly active, moderately active or very active. This choice can strongly affect the final estimate.",
          "If you are unsure, it is often better to choose a realistic activity level rather than an optimistic one. You can adjust later based on real progress.",
        ],
      },
      {
        heading: "Why TDEE is still only an estimate",
        paragraphs: [
          "TDEE calculators use formulas and activity multipliers, so the result is not guaranteed to match your exact daily calorie burn.",
          "Real energy expenditure can change because of training intensity, step count, job activity, sleep, stress, body composition and consistency.",
          "The best way to use a TDEE estimate is to treat it as a starting point. Track your weight trend, energy levels and progress for a few weeks, then adjust if needed.",
        ],
      },
      {
        heading: "How BMR and TDEE connect with macros",
        paragraphs: [
          "Once you estimate your TDEE, you can use that number to plan a calorie target. After choosing a calorie target, you can split those calories into protein, carbohydrates and fat.",
          "This is where a macro calculator becomes useful. For example, someone may estimate maintenance calories with a TDEE calculator, then use a macro calculator to create daily gram targets.",
          "BMR, TDEE, calories and macros are connected. BMR gives the baseline, TDEE gives the daily estimate, calories set the goal and macros help structure meals.",
        ],
      },
    ],
    conclusion: [
      "BMR and TDEE are both useful, but they answer different questions. BMR estimates calories burned at rest, while TDEE estimates total daily calories after activity is included.",
      "For most calorie planning, TDEE is the more useful number. Use BMR to understand your baseline and TDEE to estimate maintenance, deficit or surplus targets.",
      "All calculator results are estimates. Use them as a starting point, monitor your real progress and adjust over time.",
    ],
  },

  "how-many-calories-should-i-eat": {
    intro: [
      "Daily calorie needs are different for everyone. Your age, height, weight, activity level, training routine and goal all affect how many calories you may need per day.",
      "A calorie calculator can give you a useful starting estimate, but it cannot know your exact metabolism, daily movement, food tracking accuracy or long-term consistency.",
      "The best way to use a calorie estimate is to treat it as a starting point. Start with a reasonable number, track your progress and adjust over time.",
    ],
    sections: [
      {
        heading: "What are maintenance calories?",
        paragraphs: [
          "Maintenance calories are the estimated number of calories you need to keep your body weight roughly stable over time.",
          "If you eat close to maintenance calories consistently, your body weight should usually stay within a similar range. Small day-to-day changes are normal because of water, food volume, sodium, digestion and training.",
          "Maintenance calories are usually estimated from TDEE, which stands for total daily energy expenditure. TDEE includes your resting calorie burn plus activity and exercise.",
        ],
      },
      {
        heading: "How many calories for weight loss?",
        paragraphs: [
          "For weight loss, you generally need to eat fewer calories than your estimated maintenance level. This is called a calorie deficit.",
          "A moderate calorie deficit is usually more sustainable than a very aggressive deficit. If the deficit is too large, hunger, low energy and poor training performance can make consistency harder.",
          "A common starting point is to reduce calories gradually, then watch your weight trend over several weeks. The goal is not to react to one single day, but to look at the overall pattern.",
        ],
      },
      {
        heading: "How many calories for weight gain?",
        paragraphs: [
          "For weight gain, you generally need to eat more calories than your estimated maintenance level. This is called a calorie surplus.",
          "A controlled surplus can help support muscle gain while reducing the chance of gaining weight too quickly. A very large surplus may lead to faster weight gain, but not all of that gain will be muscle.",
          "If your goal is muscle gain, your calorie target should also be supported by progressive strength training, enough protein and consistent recovery.",
        ],
      },
      {
        heading: "How activity level affects calorie needs",
        paragraphs: [
          "Activity level can change calorie needs significantly. Someone who sits most of the day may need far fewer calories than someone who walks a lot, trains often or has a physically active job.",
          "Most calorie calculators ask you to choose an activity level. This choice is important because it can change the estimate by hundreds of calories per day.",
          "If you are unsure which activity level to choose, start with the most realistic option rather than the most optimistic one. You can always adjust later based on real progress.",
        ],
      },
      {
        heading: "Why calorie calculators are estimates",
        paragraphs: [
          "Calorie calculators use formulas. These formulas are useful, but they cannot perfectly measure your metabolism or daily energy burn.",
          "Two people with the same age, height and weight can still have different calorie needs because of muscle mass, movement habits, training intensity, sleep, stress and other factors.",
          "This is why calculator results should be used as a practical estimate, not as a strict rule. Your real-world progress is what tells you whether the target is working.",
        ],
      },
      {
        heading: "How to adjust your calorie target",
        paragraphs: [
          "After choosing a calorie target, follow it consistently for a reasonable period of time. For many people, two to four weeks is more useful than judging progress after only a few days.",
          "If your weight is not moving in the expected direction, adjust gradually. For weight loss, you might reduce calories slightly or increase activity. For weight gain, you might increase calories slightly.",
          "Avoid making large changes too often. Small adjustments are easier to understand and easier to maintain.",
        ],
      },
      {
        heading: "Calories and macros work together",
        paragraphs: [
          "Calories determine the overall energy target, while macros describe where those calories come from: protein, carbohydrates and fat.",
          "Once you have a calorie target, you can use a macro calculator to estimate protein, carb and fat targets. This can make meal planning more structured.",
          "For example, someone may first estimate daily calories, then set protein for recovery and satiety, carbohydrates for training energy and fat for diet balance.",
        ],
      },
      {
        heading: "Common calorie planning mistakes",
        paragraphs: [
          "One common mistake is choosing an activity level that is too high. This can make the calorie estimate higher than your real needs.",
          "Another common mistake is changing calories too quickly after one or two weigh-ins. Body weight can fluctuate for many reasons that are not fat gain or fat loss.",
          "A third mistake is ignoring consistency. A calorie target only works if it can be followed regularly enough to create a meaningful trend.",
        ],
      },
    ],
    conclusion: [
      "The number of calories you should eat per day depends on your goal and your estimated maintenance needs.",
      "Use a calorie calculator to find a starting point, then track your progress over time. If the trend does not match your goal, adjust gradually.",
      "Calorie estimates are useful tools, but they work best when combined with consistency, realistic expectations and regular review.",
    ],
  },

  "macro-split-for-fat-loss": {
    intro: [
      "Macros are the three main nutrients that provide calories: protein, carbohydrates and fat. A macro split shows how your daily calories are divided between these nutrients.",
      "Macro targets can make calorie planning easier because they turn a daily calorie number into practical gram targets. Instead of only knowing your calories, you also know how much protein, carbs and fat you are aiming for.",
      "There is no single perfect macro split for everyone. The best split depends on your goal, training, preferences, appetite, food choices and consistency.",
    ],
    sections: [
      {
        heading: "What are macros?",
        paragraphs: [
          "Macros, short for macronutrients, are nutrients the body needs in larger amounts. Protein, carbohydrates and fat all provide energy, but they play different roles.",
          "Protein and carbohydrates provide about 4 calories per gram. Fat provides about 9 calories per gram. This is why fat grams are usually lower than protein or carb grams in many macro plans.",
          "A macro calculator uses your calorie target and goal to estimate how many grams of each macronutrient may fit your plan.",
        ],
      },
      {
        heading: "Protein in a macro split",
        paragraphs: [
          "Protein is often the first macro to set because it supports muscle repair, recovery and satiety. People who train regularly or want to preserve lean mass often pay close attention to protein intake.",
          "In a fat loss phase, protein can help meals feel more filling and may support muscle retention when calories are lower.",
          "In a muscle gain phase, protein supports recovery and adaptation from training. However, more protein is not always better after a useful target is reached.",
        ],
      },
      {
        heading: "Carbohydrates in a macro split",
        paragraphs: [
          "Carbohydrates are an important energy source, especially for higher intensity training, sports and active daily routines.",
          "A higher-carb macro split may help people who train frequently, perform endurance work or feel better with more carbohydrates in their diet.",
          "A lower-carb split can still work for some people if it helps them manage appetite and consistency, but carbs do not need to be avoided for fat loss.",
        ],
      },
      {
        heading: "Fat in a macro split",
        paragraphs: [
          "Fat supports hormone production, nutrient absorption and overall diet satisfaction. It also helps many meals taste better and feel more satisfying.",
          "Because fat contains more calories per gram than protein or carbs, small changes in fat intake can make a larger difference in total calories.",
          "Very low fat targets may be hard to follow and may not feel good for many people. A balanced macro split usually leaves enough room for dietary fat.",
        ],
      },
      {
        heading: "Macro split for fat loss",
        paragraphs: [
          "For fat loss, calories are the main driver. A macro split supports the calorie target by helping you structure meals in a way that is easier to follow.",
          "A common approach is to keep protein relatively high, set fat at a moderate level and use the remaining calories for carbohydrates.",
          "This can help with fullness, training performance and meal planning. However, the best fat loss macro split is still the one you can follow consistently.",
        ],
      },
      {
        heading: "Macro split for maintenance",
        paragraphs: [
          "For maintenance, the goal is to keep body weight and performance relatively stable. Macro targets can be more flexible during maintenance than during a strict fat loss phase.",
          "A balanced split with enough protein, enough carbohydrates for activity and enough fat for satisfaction can work well for many people.",
          "Maintenance is also a useful phase for learning which macro ranges feel best for your energy, digestion, training and lifestyle.",
        ],
      },
      {
        heading: "Macro split for muscle gain",
        paragraphs: [
          "For muscle gain, a calorie surplus is usually needed. Protein should be sufficient, but carbohydrates often become important because they support training volume and recovery.",
          "A muscle gain macro split may include moderate-to-high carbohydrates, enough protein and enough fat to support a sustainable surplus.",
          "The surplus does not need to be extreme. A controlled surplus can support progress while reducing the chance of gaining weight too quickly.",
        ],
      },
      {
        heading: "How to choose a macro split",
        paragraphs: [
          "Start with your calorie target. Then set protein based on your body weight and goal. After that, divide the remaining calories between carbs and fat in a way that fits your training and preferences.",
          "If you feel low energy during workouts, you may benefit from more carbohydrates. If meals feel unsatisfying, you may benefit from a bit more fat.",
          "Macro targets are not fixed forever. You can adjust them as your goal, body weight, training or preferences change.",
        ],
      },
      {
        heading: "Common macro mistakes",
        paragraphs: [
          "One common mistake is trying to follow a macro split that does not match your food preferences. If the plan feels unrealistic, consistency becomes harder.",
          "Another mistake is focusing on macro percentages while ignoring total calories. A macro split only works within an appropriate calorie target.",
          "A third mistake is changing macros too often. It is usually better to follow a plan consistently, review progress and adjust gradually.",
        ],
      },
    ],
    conclusion: [
      "A macro split turns your daily calorie target into protein, carbohydrate and fat goals. It can make nutrition planning more practical and easier to track.",
      "For fat loss, maintenance and muscle gain, the best macro split is one that supports your calorie target, training needs and long-term consistency.",
      "Use macro calculator results as estimates. Adjust based on hunger, performance, progress and how sustainable the plan feels.",
    ],
  },

  "how-much-protein-per-day": {
    intro: [
      "Protein is one of the most important nutrients for people who train, want to build muscle, want to preserve lean mass or simply want more structured meals.",
      "Daily protein needs can vary based on body weight, activity level, training style, calorie target and fitness goal. A protein calculator can estimate a useful starting point, but it should not be treated as a medical prescription.",
      "The goal is to find a protein target that supports recovery, fits your meals and is realistic enough to follow consistently.",
    ],
    sections: [
      {
        heading: "Why protein matters",
        paragraphs: [
          "Protein helps the body repair and build tissues. For active people, protein is especially important because training creates a need for recovery and adaptation.",
          "Protein can also help meals feel more filling. This can be useful during fat loss phases, when calories may be lower and hunger can become harder to manage.",
          "A consistent protein intake does not guarantee results on its own, but it supports a plan that also includes appropriate calories, training, sleep and consistency.",
        ],
      },
      {
        heading: "How body weight affects protein needs",
        paragraphs: [
          "Many protein estimates are based on body weight because larger bodies usually need more total protein than smaller bodies.",
          "A protein calculator often uses body weight and goal to estimate grams per day. This is useful because it turns a general recommendation into a practical daily target.",
          "For example, someone with a higher body weight may receive a higher daily protein target than someone with a lower body weight, even if both people have similar fitness goals.",
        ],
      },
      {
        heading: "Protein for fat loss",
        paragraphs: [
          "During fat loss, protein can be especially helpful because it supports satiety and may help preserve lean mass while calories are reduced.",
          "A higher protein target can make meals feel more satisfying, which may make a calorie deficit easier to follow.",
          "Protein alone does not cause fat loss. Fat loss still depends mainly on maintaining a calorie deficit over time, but protein can support the process.",
        ],
      },
      {
        heading: "Protein for muscle gain",
        paragraphs: [
          "For muscle gain, protein supports recovery and muscle repair after training. It works best when combined with progressive resistance training and enough total calories.",
          "A muscle gain phase usually does not require unlimited protein. Once protein needs are covered, additional calories may be better used for carbohydrates and fats depending on the training plan.",
          "The best protein target for muscle gain is one that supports training and recovery while still fitting into a balanced daily calorie target.",
        ],
      },
      {
        heading: "Protein for maintenance",
        paragraphs: [
          "During maintenance, protein can help support stable body composition, recovery and meal structure.",
          "Maintenance phases are often more flexible than fat loss phases because calories are not as restricted. However, keeping a consistent protein target can still be useful.",
          "A maintenance protein target can also make it easier to transition between fat loss, muscle gain and long-term balanced eating.",
        ],
      },
      {
        heading: "Protein per meal",
        paragraphs: [
          "Dividing protein across meals can make a daily target easier to reach. Instead of trying to eat most protein in one meal, many people prefer spreading it across breakfast, lunch, dinner and snacks.",
          "For example, a daily target of 160 grams could be divided across four meals as about 40 grams per meal. This is not a strict rule, but it can make planning easier.",
          "A protein calculator with meals-per-day estimates can help turn a daily number into a more practical meal-by-meal target.",
        ],
      },
      {
        heading: "Protein and training performance",
        paragraphs: [
          "Protein supports recovery, but carbohydrates and total calories also matter for training performance. A diet that is high in protein but too low in overall energy may still leave someone feeling tired.",
          "For strength training, protein helps repair muscle tissue, but performance also depends on training quality, progressive overload, rest and enough fuel.",
          "For endurance training, protein still matters, but carbohydrate intake may also be very important because endurance work can use a lot of stored energy.",
        ],
      },
      {
        heading: "Can you eat too much protein?",
        paragraphs: [
          "For many healthy people, moderate-to-high protein diets can fit into a balanced plan. However, more protein is not automatically better after useful needs are met.",
          "Very high protein intake may crowd out carbohydrates, fats, fiber and micronutrient-rich foods if the overall diet becomes unbalanced.",
          "People with kidney disease, medical conditions or special dietary needs should speak with a qualified professional before making major changes to protein intake.",
        ],
      },
      {
        heading: "How to use a protein calculator wisely",
        paragraphs: [
          "Use a protein calculator as a starting point. Enter your body weight, goal and meals per day to estimate daily protein and per-meal protein targets.",
          "Then compare the estimate with your real meals. If the target feels impossible to follow, adjust gradually rather than forcing a plan that does not fit your lifestyle.",
          "The most useful protein target is one that supports your goal and can be repeated consistently over time.",
        ],
      },
    ],
    conclusion: [
      "Daily protein needs depend on body weight, activity level and goal. A protein calculator can provide a practical estimate for daily grams and protein per meal.",
      "Protein can support fat loss, muscle gain, maintenance and recovery, but it works best as part of a complete plan with appropriate calories, training and consistency.",
      "Use protein targets as helpful estimates, not strict medical rules. Adjust based on your meals, progress, recovery and personal needs.",
    ],
  },
  "how-much-water-should-you-drink-per-day": {
    intro: [
      "Daily water needs can vary from person to person. Body weight, activity level, climate, sweating, diet and health status can all affect how much water someone may need in a day.",
      "A water intake calculator can give a practical starting estimate, but hydration is not a fixed number for every person. Some days you may need more water, and some days you may need less.",
      "The best approach is to use a water estimate as a baseline, then adjust based on thirst, urine color, exercise, heat exposure and how your body feels.",
    ],
    sections: [
      {
        heading: "Why water intake matters",
        paragraphs: [
          "Water supports many basic functions in the body. It helps regulate body temperature, supports digestion, carries nutrients, helps remove waste and supports normal physical performance.",
          "Even mild dehydration can make some people feel tired, unfocused or less comfortable during exercise. Hydration can also affect how well someone tolerates heat and longer training sessions.",
          "Water needs are not only about drinking plain water. Fluids from drinks and water-rich foods can also contribute to daily hydration.",
        ],
      },
      {
        heading: "What affects daily water needs?",
        paragraphs: [
          "Body size is one factor that affects water needs. A larger body generally requires more total fluid than a smaller body.",
          "Activity level also matters. Someone who exercises, walks a lot or has a physically active job may lose more fluid through sweat and breathing.",
          "Climate is another important factor. Hot or humid environments can increase sweating, which may increase daily fluid needs.",
        ],
      },
      {
        heading: "Water needs and exercise",
        paragraphs: [
          "Exercise can increase water needs because the body uses sweat to help regulate temperature. The more intense or longer the workout, the more fluid may be needed.",
          "Training in hot conditions can increase fluid loss even more. A short easy workout in a cool room is very different from a long outdoor workout in summer heat.",
          "A calculator can estimate extra water based on exercise minutes, but real needs can vary based on sweat rate, clothing, environment and intensity.",
        ],
      },
      {
        heading: "Water needs in hot weather",
        paragraphs: [
          "Hot weather can increase sweating even without formal exercise. People may need more fluids when spending time outdoors, working in heat or living in a warm climate.",
          "Humidity can make heat feel harder because sweat may not evaporate as easily. This can make hydration and cooling more challenging.",
          "If the weather is hot, it can be useful to drink regularly throughout the day rather than waiting until thirst becomes strong.",
        ],
      },
      {
        heading: "How to tell if you may need more water",
        paragraphs: [
          "Thirst is an obvious sign, but it is not the only clue. Darker urine, dry mouth, headache, low energy or reduced exercise performance can sometimes suggest that fluid intake may be low.",
          "Urine color can be a practical everyday clue. Very pale urine all day may suggest you are drinking more than needed, while consistently dark urine may suggest you need more fluids.",
          "However, urine color can also be affected by supplements, vitamins, medication and foods, so it should not be used as the only signal.",
        ],
      },
      {
        heading: "Can you drink too much water?",
        paragraphs: [
          "Yes, it is possible to drink too much water, especially if very large amounts are consumed in a short time. More water is not always better.",
          "Overhydration can dilute electrolytes in the body. This is uncommon for most everyday situations, but it can be a risk during long endurance events if someone drinks excessive water without electrolytes.",
          "For most people, a balanced approach is best: drink enough to stay hydrated, but do not force extreme amounts far beyond thirst and practical needs.",
        ],
      },
      {
        heading: "Do coffee, tea and other drinks count?",
        paragraphs: [
          "Many drinks can contribute to daily fluid intake. Water, sparkling water, tea, coffee, milk and other beverages can all add fluid.",
          "Some drinks contain caffeine, sugar or calories, so they may not all be equal from a nutrition perspective. Still, they can contribute to total fluid intake.",
          "For everyday hydration, plain water is usually the simplest choice, but it does not need to be the only source of fluids.",
        ],
      },
      {
        heading: "How to use a water intake calculator",
        paragraphs: [
          "A water intake calculator usually starts with body weight, then adjusts based on exercise time and climate. This gives a simple estimate for daily hydration needs.",
          "Use the result as a practical baseline, not a strict rule. If you exercise more, sweat heavily or spend time in heat, your needs may be higher.",
          "If you feel like the result is too high or too low, compare it with real hydration signals such as thirst, urine color and how you feel during the day.",
        ],
      },
      {
        heading: "Simple hydration habits",
        paragraphs: [
          "A simple habit is to drink water after waking, with meals and around workouts. This spreads fluid intake across the day instead of trying to drink everything at once.",
          "Keeping a water bottle nearby can help people who forget to drink. Adding a routine can be easier than relying only on thirst.",
          "For longer workouts or hot days, planning fluids before, during and after activity can be more effective than waiting until after dehydration symptoms appear.",
        ],
      },
    ],
    conclusion: [
      "Daily water needs depend on body size, activity, exercise, climate and individual response. A water intake calculator can provide a useful starting estimate.",
      "Hydration should be adjusted based on real conditions. Hot weather, long workouts and heavy sweating may increase fluid needs.",
      "Use water intake estimates as practical guidance, not a rigid rule. Pay attention to thirst, urine color, energy, exercise performance and comfort throughout the day.",
    ],
  },
  "how-to-estimate-body-fat-percentage": {
    intro: [
      "Body fat percentage is an estimate of how much of your body weight comes from fat mass. It can provide a different perspective than body weight or BMI because it focuses more on body composition.",
      "A body fat calculator can estimate body fat percentage from measurements such as height, weight, neck, waist and hip circumference. These estimates can be useful, but they are not perfect measurements.",
      "The best way to use a body fat percentage estimate is to track general trends over time, not to treat one single result as an exact number.",
    ],
    sections: [
      {
        heading: "What body fat percentage means",
        paragraphs: [
          "Body fat percentage describes the estimated proportion of body weight that is fat mass. For example, if someone weighs 80 kg and is estimated to have 20% body fat, the estimated fat mass would be about 16 kg.",
          "The remaining body weight includes lean mass such as muscle, bone, organs, fluids and connective tissue. This is why two people with the same weight can look and perform differently.",
          "Body fat percentage can be useful because it gives more context than weight alone. Body weight does not show whether changes are coming from fat, muscle, water or other factors.",
        ],
      },
      {
        heading: "How measurement-based body fat estimates work",
        paragraphs: [
          "Many online body fat calculators use body measurements to estimate body fat percentage. Common inputs include height, weight, neck circumference, waist circumference and sometimes hip circumference.",
          "The calculator uses a formula to compare these measurements and estimate body composition. The result is based on population-level patterns, so it may not perfectly match every individual.",
          "Measurement-based methods are popular because they are simple, inexpensive and easy to repeat at home. However, accuracy depends heavily on consistent measurement technique.",
        ],
      },
      {
        heading: "Why measurements must be consistent",
        paragraphs: [
          "Small measurement differences can change the final estimate. Measuring the waist slightly higher or lower, pulling the tape too tightly or measuring at a different time of day can affect the result.",
          "For better consistency, use the same tape measure, measure in the same position and repeat the measurement under similar conditions.",
          "It can also help to take multiple measurements and use the average. This reduces the chance that one unusual measurement changes the result too much.",
        ],
      },
      {
        heading: "Body fat percentage vs BMI",
        paragraphs: [
          "BMI compares weight with height, while body fat percentage estimates the proportion of weight that comes from fat mass.",
          "BMI is faster and easier to calculate, but it does not distinguish between fat mass and lean mass. Body fat percentage can add more context, especially for people with higher muscle mass.",
          "Both numbers are estimates with limitations. BMI is useful for a quick general range, while body fat percentage can provide more detail about body composition.",
        ],
      },
      {
        heading: "Why body fat calculators are estimates",
        paragraphs: [
          "Online body fat calculators cannot directly measure body fat. They estimate it using formulas and body measurements.",
          "More advanced methods such as DEXA scans, hydrostatic weighing or professional assessments may provide more detailed estimates, but even those methods can vary.",
          "Because every method has some margin of error, body fat percentage should be interpreted as an approximate range rather than an exact truth.",
        ],
      },
      {
        heading: "How to track body fat percentage over time",
        paragraphs: [
          "The most useful way to use body fat estimates is to track changes over time. A single reading may be imperfect, but repeated measurements under similar conditions can show a useful trend.",
          "For example, if body weight stays similar but estimated body fat percentage slowly decreases, that may suggest improved body composition.",
          "It is usually better to compare monthly trends rather than reacting to small week-to-week changes, because water retention and measurement variation can affect results.",
        ],
      },
      {
        heading: "Common mistakes when estimating body fat",
        paragraphs: [
          "One common mistake is measuring the waist inconsistently. The waist measurement is often one of the most influential inputs, so inconsistent technique can change the estimate.",
          "Another mistake is expecting the calculator to be perfectly accurate. Body fat calculators are useful tools, but they should not replace professional assessment when accuracy is important.",
          "A third mistake is comparing results from different methods as if they are identical. A tape-measure calculator, smart scale and DEXA scan may all produce different numbers.",
        ],
      },
      {
        heading: "How to interpret your result",
        paragraphs: [
          "A body fat estimate can help you understand general body composition, but it should be considered alongside other information such as strength, energy, waist measurement, training progress and overall health markers.",
          "If the number is higher or lower than expected, avoid making extreme decisions based on one result. Recheck measurements and watch trends over time.",
          "For health-related concerns, it is best to speak with a qualified professional. Calculator results are informational estimates and are not medical advice.",
        ],
      },
    ],
    conclusion: [
      "Body fat percentage can give more context than body weight alone because it estimates body composition.",
      "Measurement-based calculators are useful because they are simple and repeatable, but they depend on consistent measurement technique and should be treated as estimates.",
      "Use body fat percentage to track long-term trends, not to judge progress from a single number.",
    ],
  },
  "ideal-weight-formulas-explained": {
    intro: [
      "Ideal weight formulas try to estimate a healthy body weight range based mainly on height. They can be useful as a quick reference, but they should not be treated as exact targets for every person.",
      "Different formulas can produce different results because each formula was created with different assumptions. This is why an ideal weight calculator often shows multiple formula estimates instead of only one number.",
      "The best way to use ideal weight results is to understand them as general estimates, then compare them with other information such as BMI, body composition, waist measurement, activity level and personal health context.",
    ],
    sections: [
      {
        heading: "What does ideal weight mean?",
        paragraphs: [
          "Ideal weight usually refers to an estimated body weight range that may be considered reasonable for a person's height. It is not a perfect definition of health.",
          "A person can be above or below an ideal weight formula estimate and still have different levels of fitness, strength, muscle mass and health markers.",
          "Because of this, ideal weight should be used as a general planning tool rather than a strict rule.",
        ],
      },
      {
        heading: "Why ideal weight formulas differ",
        paragraphs: [
          "Different ideal weight formulas use different assumptions. Some formulas were designed for medical dosing, some for broad health estimates and some for simple height-based reference ranges.",
          "Because the formulas are not identical, they often produce different results for the same height. This does not mean one formula is always correct and the others are wrong.",
          "Seeing several estimates can be more useful than relying on only one formula because it shows that ideal weight is better understood as a range.",
        ],
      },
      {
        heading: "Common ideal weight formulas",
        paragraphs: [
          "Common ideal weight formulas include formulas such as Devine, Robinson, Miller and Hamwi. These formulas estimate weight from height and sometimes use different constants depending on the formula design.",
          "The results are usually close in some cases and more different in others. Taller or shorter individuals may notice wider differences between formula estimates.",
          "An ideal weight calculator can compare these formulas in one place so users can see the range instead of calculating each one manually.",
        ],
      },
      {
        heading: "Ideal weight vs BMI",
        paragraphs: [
          "BMI compares body weight with height, while ideal weight formulas estimate a target or reference weight based mostly on height.",
          "BMI gives a category such as underweight, normal, overweight or obesity range. Ideal weight formulas usually give an estimated weight number or range.",
          "Both methods are simplified. BMI does not directly measure body fat or muscle mass, and ideal weight formulas do not know body composition, frame size or training background.",
        ],
      },
      {
        heading: "Ideal weight and body composition",
        paragraphs: [
          "Body composition can strongly affect how useful an ideal weight estimate feels. Someone with more muscle mass may weigh more than a formula estimate while still having a healthy body composition.",
          "On the other hand, someone may fall near an ideal weight estimate but still have low muscle mass or higher body fat percentage.",
          "This is why ideal weight is often more useful when combined with body fat percentage, waist measurement and general fitness progress.",
        ],
      },
      {
        heading: "Why frame size and muscle mass matter",
        paragraphs: [
          "Two people with the same height can have different bone structure, muscle mass and body shape. A single ideal weight number cannot capture all of these differences.",
          "A person with a larger frame or more lean mass may naturally sit above a formula estimate. A person with a smaller frame may feel better at a lower point in the estimated range.",
          "This is another reason to treat ideal weight as a flexible reference rather than a fixed target.",
        ],
      },
      {
        heading: "How to use an ideal weight calculator",
        paragraphs: [
          "Start by entering height and selecting the formula option if the calculator provides one. The result can show one or more estimated ideal weight values.",
          "Instead of focusing on a single exact number, look at the range across formulas. This gives a more realistic view of how broad ideal weight estimates can be.",
          "If your current weight is far outside the range, the result may be useful as a reference point, but any major weight change plan should be realistic and sustainable.",
        ],
      },
      {
        heading: "Common mistakes with ideal weight estimates",
        paragraphs: [
          "One common mistake is treating an ideal weight formula as a personal requirement. A formula does not know your training history, body composition, medical background or personal needs.",
          "Another mistake is comparing yourself too closely to someone else with the same height. Height alone does not determine the best weight for every individual.",
          "A third mistake is using ideal weight without considering lifestyle. A target that is difficult to maintain may not be useful even if it looks good on paper.",
        ],
      },
      {
        heading: "When ideal weight estimates are most useful",
        paragraphs: [
          "Ideal weight estimates can be useful for setting broad expectations, comparing formula ranges and starting a conversation about body weight goals.",
          "They can also help users understand whether a goal weight is very aggressive, moderate or relatively close to common formula estimates.",
          "However, the estimate should be combined with other tools such as BMI, calorie needs, body fat estimates and professional advice when needed.",
        ],
      },
    ],
    conclusion: [
      "Ideal weight formulas can provide a useful reference, but they are simplified estimates based mostly on height.",
      "Different formulas often give different results, so it is better to think in ranges rather than one exact number.",
      "Use ideal weight estimates as a starting point, then consider body composition, fitness level, sustainability and personal health context before setting a goal.",
    ],
  },
  "one-rep-max-guide": {
    intro: [
      "One rep max, often written as 1RM, is an estimate of the maximum weight you could lift for one complete repetition of an exercise.",
      "Testing a true one rep max can be demanding and may not be necessary for most lifters. A one rep max calculator can estimate strength from a submaximal set, such as a weight you lifted for several reps.",
      "The goal is not to prove strength at any cost. The goal is to estimate training numbers safely and use them to plan better workouts.",
    ],
    sections: [
      {
        heading: "What does one rep max mean?",
        paragraphs: [
          "One rep max means the maximum amount of weight you can lift once with proper technique for a specific exercise.",
          "For example, if someone can bench press 100 kg for one clean repetition and cannot lift more with good form, their one rep max for the bench press may be around 100 kg.",
          "A 1RM is exercise-specific. Your squat 1RM, deadlift 1RM, bench press 1RM and overhead press 1RM are different numbers.",
        ],
      },
      {
        heading: "Why estimate 1RM instead of testing it?",
        paragraphs: [
          "A true one rep max test can be physically and mentally demanding. It requires good technique, preparation, warm-up sets and often a spotter or safe setup.",
          "For many people, estimating 1RM from a set of multiple reps is safer and more practical. You can use a weight that is challenging but not maximal.",
          "For example, instead of testing the heaviest possible single, you might enter a weight you lifted for 5 reps and estimate your 1RM from that performance.",
        ],
      },
      {
        heading: "How one rep max formulas work",
        paragraphs: [
          "One rep max calculators use formulas to estimate your maximum strength based on weight lifted and reps completed.",
          "Different formulas may produce slightly different results. Common formulas often work best when the rep count is not too high.",
          "The estimate becomes less reliable when reps are very high because muscular endurance, pacing and fatigue start to influence the result more strongly.",
        ],
      },
      {
        heading: "Best rep ranges for estimating 1RM",
        paragraphs: [
          "A set of 2 to 8 reps is often more useful for estimating 1RM than a very high-rep set. Lower rep sets usually relate more closely to maximal strength.",
          "A 10-rep set can still provide an estimate, but it may be less precise for some lifters because endurance becomes a bigger factor.",
          "If your goal is a practical training estimate, use a recent set where form was solid and the reps were completed with consistent technique.",
        ],
      },
      {
        heading: "Why form matters when estimating strength",
        paragraphs: [
          "A one rep max estimate is only useful if the input set was performed with good form. If technique breaks down, the result may not be a safe or useful training number.",
          "Range of motion, control, tempo and exercise setup should be consistent. A half squat and a full-depth squat cannot be compared as if they are the same lift.",
          "For safer training, it is better to use a slightly conservative estimate than an inflated number based on poor technique.",
        ],
      },
      {
        heading: "Training percentages from 1RM",
        paragraphs: [
          "Once you have an estimated 1RM, you can calculate training percentages. For example, 70%, 75%, 80% or 85% of 1RM can be used for different strength or hypertrophy sessions.",
          "Training percentages help turn one max estimate into practical workout weights. This can make programming more structured.",
          "However, percentages are still estimates. Daily energy, sleep, stress, warm-up quality and exercise variation can affect how heavy a weight feels.",
        ],
      },
      {
        heading: "When not to test a true max",
        paragraphs: [
          "Testing a true max may not be appropriate if you are new to lifting, returning from injury, training without safe equipment or unsure about technique.",
          "A true max test can also be unnecessary if your goal is general fitness, muscle building or consistent progress rather than competition performance.",
          "In many cases, estimated 1RM is enough for planning training weights without the extra risk of maximal attempts.",
        ],
      },
      {
        heading: "How often should you estimate 1RM?",
        paragraphs: [
          "You do not need to estimate 1RM every workout. Strength can fluctuate from day to day, and constantly testing can interfere with training quality.",
          "Many lifters update estimated 1RM after a training block, after a rep personal record or when a program asks for new training percentages.",
          "A good approach is to track performance over time and update estimates when there is a meaningful change, not after every single session.",
        ],
      },
      {
        heading: "Common one rep max mistakes",
        paragraphs: [
          "One common mistake is using a sloppy set as the input. If the reps were not controlled or the range of motion changed, the estimate may be misleading.",
          "Another mistake is treating the estimate as a guaranteed number. A calculator may estimate that you can lift a certain weight once, but that does not mean you should immediately attempt it.",
          "A third mistake is ignoring exercise differences. A 1RM estimate for one variation, such as high-bar squat, should not automatically be used for another variation, such as front squat.",
        ],
      },
    ],
    conclusion: [
      "A one rep max calculator can estimate strength without requiring a true max test. This can make training safer and easier to plan.",
      "Use recent, clean reps with consistent technique for the most useful estimate. Treat the result as a guide, not a guarantee.",
      "Estimated 1RM works best when combined with smart programming, good form, proper warm-ups and realistic training decisions.",
    ],
  },
  "weight-loss-timeline-explained": {
    intro: [
      "A weight loss timeline estimates how long it may take to reach a target weight based on current weight, target weight and an estimated calorie deficit.",
      "This kind of estimate can be useful for planning, but it should not be treated as a guaranteed schedule. Real weight loss is rarely perfectly linear.",
      "A weight loss timeline calculator gives a starting projection. The actual timeline can change based on consistency, water weight, activity, sleep, stress, calorie tracking accuracy and metabolic adaptation.",
    ],
    sections: [
      {
        heading: "How weight loss timelines are estimated",
        paragraphs: [
          "A weight loss timeline usually starts by calculating how much weight someone wants to lose. For example, if current weight is 85 kg and target weight is 75 kg, the target change is 10 kg.",
          "The calculator then uses an estimated daily calorie deficit to estimate weekly fat loss. A larger deficit usually creates a faster projected timeline, while a smaller deficit creates a slower projected timeline.",
          "Because the result is based on estimates, the timeline should be used as a planning guide rather than a strict promise.",
        ],
      },
      {
        heading: "What is a calorie deficit?",
        paragraphs: [
          "A calorie deficit means consuming fewer calories than the body burns over time. When this happens consistently, the body may use stored energy, which can lead to weight loss.",
          "The deficit can come from eating fewer calories, increasing activity or a combination of both.",
          "A moderate deficit is often easier to sustain than an aggressive deficit. Very large deficits may increase hunger, reduce energy and make consistency harder.",
        ],
      },
      {
        heading: "Why weight loss is not perfectly linear",
        paragraphs: [
          "Many people expect weight to drop at the same pace every week, but real progress often moves in waves. Some weeks may show a larger drop, while other weeks may show little or no change.",
          "Water retention, sodium intake, carbohydrate intake, digestion, training soreness, menstrual cycle changes and stress can all affect scale weight.",
          "Because of this, it is usually better to watch the trend over several weeks instead of reacting to one single weigh-in.",
        ],
      },
      {
        heading: "Fat loss vs scale weight",
        paragraphs: [
          "Scale weight includes fat mass, muscle mass, water, food volume and waste. This means scale weight can change even when fat loss is still happening.",
          "For example, starting a new workout plan can cause temporary water retention from muscle soreness. This may hide fat loss on the scale for a short time.",
          "A timeline calculator estimates weight change from a calorie deficit, but the scale may not show that change smoothly every day.",
        ],
      },
      {
        heading: "How large should a calorie deficit be?",
        paragraphs: [
          "The best deficit depends on the person, starting weight, goal, activity level and ability to stay consistent.",
          "A smaller deficit may feel easier and support better training performance, but progress will be slower. A larger deficit may be faster on paper, but it can be harder to maintain.",
          "A sustainable deficit is usually better than an extreme deficit that leads to repeated stopping and restarting.",
        ],
      },
      {
        heading: "How exercise affects the timeline",
        paragraphs: [
          "Exercise can support weight loss by increasing energy expenditure and helping preserve fitness and muscle.",
          "Strength training can be especially useful because it supports muscle retention while weight is being lost.",
          "However, exercise calories are difficult to estimate perfectly. A timeline calculator should not be treated as exact just because exercise is included.",
        ],
      },
      {
        heading: "Why calorie tracking accuracy matters",
        paragraphs: [
          "A weight loss timeline is only as accurate as the inputs. If calorie intake or deficit estimates are inaccurate, the timeline can be too optimistic or too conservative.",
          "Common tracking issues include underestimating portion sizes, forgetting snacks, not counting oils or sauces and overestimating calories burned from exercise.",
          "Improving consistency and tracking accuracy can make the timeline more useful over time.",
        ],
      },
      {
        heading: "When to adjust your timeline",
        paragraphs: [
          "If your weight trend does not move as expected for several weeks, it may be time to adjust the plan.",
          "Adjustments can include a small calorie change, more daily steps, a revised activity estimate or a more realistic target date.",
          "It is usually better to adjust based on trends rather than one unusual week.",
        ],
      },
      {
        heading: "Setting realistic expectations",
        paragraphs: [
          "A realistic weight loss timeline should leave room for normal life. Travel, social meals, stress, illness and busy schedules can all affect consistency.",
          "A slightly slower but sustainable plan is often more effective than an aggressive plan that is difficult to maintain.",
          "The goal is not only reaching a target weight, but also building habits that make the result easier to maintain.",
        ],
      },
      {
        heading: "How to use a weight loss timeline calculator",
        paragraphs: [
          "Enter your current weight, target weight and estimated calorie deficit. The calculator will estimate the amount of time needed to reach the target.",
          "Use the result as a planning estimate. If the timeline feels unrealistic, consider changing the deficit or target.",
          "Revisit the calculator every few weeks as body weight, activity level and consistency change.",
        ],
      },
    ],
    conclusion: [
      "A weight loss timeline calculator can help you estimate how long a goal may take, but the result is not a guarantee.",
      "Real weight loss is affected by calorie consistency, water weight, training, stress, sleep, tracking accuracy and normal daily variation.",
      "Use the timeline as a planning tool. Track trends, adjust gradually and choose a pace that is realistic enough to maintain.",
    ],
  },
  
};

export function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      title: `${post.title} | FitCalcLab`,
      description: post.description,
      url: `${siteConfig.url}/blog/${post.slug}`,
      siteName: siteConfig.name,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | FitCalcLab`,
      description: post.description,
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPostBySlug(slug);
  const article = articleContent[slug];

  if (!post || !article) {
    notFound();
  }

  return (
    <main className="bg-slate-50 text-slate-950 dark:bg-slate-950 dark:text-slate-50">
      <BlogPostJsonLd
        title={post.title}
        description={post.description}
        slug={post.slug}
        publishedAt={post.publishedAt}
      />
      <article className="mx-auto max-w-3xl px-4 py-14 md:py-20">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-medium text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to guides
        </Link>

        <div className="mt-8">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              {post.category}
            </span>

            <span className="text-xs text-slate-500 dark:text-slate-400">
              {post.readingTime}
            </span>
          </div>

          <h1 className="mt-5 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl dark:text-white">
            {post.title}
          </h1>

          <p className="mt-5 text-lg leading-8 text-slate-600 dark:text-slate-300">
            {post.description}
          </p>
        </div>

        <div className="mt-10 rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
          {/* Intro Section - Supports both string and string[] safely */}
          <div className="space-y-4">
            {Array.isArray(article.intro) ? (
              article.intro.map((para, idx) => (
                <p key={idx} className="leading-8 text-slate-700 dark:text-slate-300">
                  {para}
                </p>
              ))
            ) : (
              <p className="leading-8 text-slate-700 dark:text-slate-300">
                {article.intro}
              </p>
            )}
          </div>

          {/* Dynamic Content Sections */}
          <div className="mt-8 space-y-8">
            {article.sections.map((section) => (
              <section key={section.heading}>
                <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                  {section.heading}
                </h2>

                {/* Supports old 'body' and new 'paragraphs' fields */}
                {section.body && (
                  <p className="mt-3 leading-8 text-slate-700 dark:text-slate-300">
                    {section.body}
                  </p>
                )}

                {section.paragraphs && (
                  <div className="mt-3 space-y-4">
                    {section.paragraphs.map((paragraph, pIdx) => (
                      <p key={pIdx} className="leading-8 text-slate-700 dark:text-slate-300">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                )}
              </section>
            ))}
          </div>

          {/* Conclusion Section (if available) */}
          {article.conclusion && article.conclusion.length > 0 && (
            <section className="mt-10 border-t border-slate-100 pt-8 dark:border-slate-800">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Conclusion
              </h2>
              <div className="mt-4 space-y-4">
                {article.conclusion.map((conclusionPara, cIdx) => (
                  <p key={cIdx} className="leading-8 text-slate-700 dark:text-slate-300">
                    {conclusionPara}
                  </p>
                ))}
              </div>
            </section>
          )}

          {/* Related Tools Box */}
          <div className="mt-10 rounded-2xl bg-emerald-50 p-5 dark:bg-emerald-950/40">
            <p className="text-sm font-medium text-emerald-800 dark:text-emerald-200">
              Related calculator
            </p>

            <Link
              href={post.relatedToolHref}
              className="mt-3 inline-flex items-center gap-2 font-semibold text-emerald-700 hover:text-emerald-800 dark:text-emerald-300 dark:hover:text-emerald-200"
            >
              Try the {post.relatedToolLabel}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* FAQs Mapping */}
          {article.faqs && article.faqs.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Frequently asked questions
              </h2>

              <div className="mt-5 space-y-4">
                {article.faqs.map((faq) => (
                  <div
                    key={faq.question}
                    className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950"
                  >
                    <h3 className="text-lg font-semibold text-slate-950 dark:text-white">
                      {faq.question}
                    </h3>

                    <p className="mt-2 leading-7 text-slate-700 dark:text-slate-300">
                      {faq.answer}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          ) : null}

          {/* Related Guides Mapping */}
          {article.relatedSlugs && article.relatedSlugs.length > 0 ? (
            <section className="mt-10">
              <h2 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">
                Related guides
              </h2>

              <div className="mt-5 grid gap-4">
                {article.relatedSlugs
                  .map((relatedSlug) => getBlogPostBySlug(relatedSlug))
                  .filter(Boolean)
                  .map((relatedPost) => (
                    <Link
                      key={relatedPost!.slug}
                      href={`/blog/${relatedPost!.slug}`}
                      className="rounded-2xl border border-slate-200 bg-slate-50 p-5 transition-colors hover:border-emerald-200 dark:border-slate-800 dark:bg-slate-950 dark:hover:border-emerald-900"
                    >
                      <p className="text-sm font-medium text-emerald-700 dark:text-emerald-300">
                        {relatedPost!.category}
                      </p>

                      <h3 className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">
                        {relatedPost!.title}
                      </h3>

                      <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">
                        {relatedPost!.description}
                      </p>
                    </Link>
                  ))}
              </div>
            </section>
          ) : null}

          <p className="mt-8 text-sm leading-6 text-slate-500 dark:text-slate-400">
            This guide is for informational purposes only and is not medical
            advice. Calculator results are estimates and should be interpreted
            with personal context.
          </p>
        </div>
      </article>
    </main>
  );
}