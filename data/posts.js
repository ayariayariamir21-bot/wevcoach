export const posts = [
  {
    slug: "how-to-pace-your-first-marathon",
    title: "How to Pace Your First Marathon",
    date: "2026-08-20",
    readTime: "5 min read",
    emoji: "🏃",
    excerpt:
      "Most first-time marathoners blow up by kilometer 30 because they start too fast. Learn the negative-split strategy I give every beginner so you finish strong instead of just surviving.",
    content: [
      "Here's the mistake I see in almost every first-time marathoner I coach: they feel amazing at kilometer 10, get carried away by the crowd, and run a full minute per kilometer faster than their goal pace. By kilometer 30, the bill comes due. The legs turn to concrete, the energy gels stop working, and the last 12 kilometers become a death march. I know this because I did exactly the same thing in my own debut — and I have spent 10+ years making sure my athletes don't repeat it.",
      "The fix is a pacing strategy called the negative split, and it is beautifully simple. Take your goal finish time and divide the race into two halves — then run the second half slightly faster than the first. If you are targeting 4:30, that means going through halfway in about 2:16, not 2:10. Those 'lost' minutes in the first half are not lost at all. They are glycogen saved, muscle damage avoided, and core temperature kept under control. Every runner I have coached to a negative split has told me the same thing afterward: 'I passed hundreds of people after kilometer 32.'",
      "In training, we rehearse this with progression long runs. Once a week, you finish your long run with the last 20 to 30 minutes at goal marathon pace or slightly faster, on tired legs. This teaches your body — and more importantly your mind — what controlled early pacing feels like and what it costs to finish strong. Pair that with a pace band on your wrist or a simple watch alert, and you remove all race-day guesswork. On the start line, adrenaline will lie to you. Your plan won't.",
      "One last piece of coaching advice: write your kilometer splits on your forearm in marker pen before the race. When the excitement peaks around kilometer 8 and your watch says you are 20 seconds ahead of plan, that ink is your coach yelling at you to back off. Trust the plan for 30 kilometers, and the race will reward you with the greatest feeling in running — flying past the wall while everyone around you hits it.",
    ],
  },
  {
    slug: "what-to-eat-week-before-race-day",
    date: "2026-08-05",
    readTime: "4 min read",
    emoji: "🥗",
    excerpt:
      "Carb-loading is not a last-night pasta binge — it's a 7-day plan. Here's exactly what to eat each day before the race, plus the breakfast I recommend 3 hours before the start.",
    content: [
      "Let me kill the biggest nutrition myth in marathon running: carb-loading does not mean stuffing yourself with pasta the night before the race. One giant meal just leaves you bloated, restless, and sprinting for the portable toilets on race morning. Real carb-loading is a gradual 7-day process of shifting your plate, and when my athletes follow it, they consistently tell me they felt 'a gear higher' from kilometer 25 onward.",
      "Here is the framework I give every runner I coach. Seven to four days out, eat normally but make carbohydrates roughly half your plate at each meal — rice, oats, bread, potatoes, whatever you digest well. Three to two days out, push that to two-thirds of the plate while cutting back on fiber, fat, and anything spicy or unfamiliar. Your long run taper means you are burning less, so those glycogen stores fill up like a battery. The day before the race, eat your biggest meal at lunch, keep dinner early, light, and boring — white rice with chicken is my classic recommendation — and sip water steadily instead of chugging liters at midnight.",
      "Race morning is where races are quietly won or lost. Eat 3 hours before the start: something you have tested in training at least three times. My go-to prescription is white bread or bagel with honey plus a banana and coffee if you are a coffee drinker — roughly 150 to 200 grams of easy carbs, low fiber, low fat. Nothing new on race day, ever. I once watched an athlete PR-chase unravel because he tried a 'superfood' breakfast from the expo. Don't be that runner.",
      "During the race itself, plan 60 grams of carbs per hour starting at minute 30 — gels, chews, or sports drink, whatever your stomach knows. Practice this on your long runs so your gut is trained like your legs. Fueling is not cheating and it is not optional at the marathon distance. It is the fourth discipline of the race alongside pacing, hydration, and mindset — and it is the one entirely within your control before the gun goes off.",
    ],
  },
  {
    slug: "mental-trick-kilometer-35",
    date: "2026-07-18",
    readTime: "6 min read",
    emoji: "🧠",
    excerpt:
      "At kilometer 35 of my 2:38 PR, my legs were screaming at me to stop. Discover the chunking technique I teach my athletes to break through the wall one winnable piece at a time.",
    content: [
      "Kilometer 35 of my 2:38 personal best is still vivid in my memory. My quads were cramping with every stride, a headwind had picked up, and a very loud voice in my head was making an excellent case for slowing down — nobody would blame me, I had already run a great race, I could 'just enjoy it from here.' Every marathoner meets this voice. The runners who PR are not the ones who never hear it. They are the ones who have a plan for answering it.",
      "The technique that saved my race — and the one I now teach every athlete I coach — is called chunking. Your brain panics at '7 more kilometers' because it feels enormous when you are exhausted. So you stop running 7 kilometers and start running to the next lamppost, the next water station, the next corner. One small, winnable piece at a time. I broke those final kilometers into 500-meter chunks, and each one I completed was proof the voice was wrong. By kilometer 38, I was passing people who had passed me at kilometer 25.",
      "Here is how we train this before race day, because like any skill, it needs rehearsal. In your last three long runs, dedicate the final 30 minutes to mental practice: pick landmarks ahead and commit to 'strong and relaxed' form until each one, then immediately pick the next. Pair each chunk with a cue word — mine is 'smooth' — and a physical reset: drop your shoulders, unclench your jaw, breathe out. This builds a routine your brain can fall back on when rational thinking shuts down at kilometer 35.",
      "And one final thought I share with every runner before their race: the wall is not a wall. It is a fog. Walls don't move, but fog always thins if you keep walking through it. When kilometer 35 arrives — and it will — shrink the race to the next 500 meters, run that well, and repeat. Seven kilometers is terrifying. Five hundred meters is nothing. That is the whole trick, and it carried me to 2:38.",
    ],
  },
];

export function getPost(slug) {
  return posts.find((post) => post.slug === slug);
}
