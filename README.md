# Portfolio

Kaavin Balasubramanian's portfolio. Next.js 16 (App Router), React 19, Tailwind CSS 4, three.js, Lenis and Motion.

```bash
npm install
npm run dev        # http://localhost:3000
npm run lint
npm run typecheck
npm run build
```

## Where things live

| Path | What it does |
| --- | --- |
| `lib/content.ts` | Every fact on the site: projects, experience, publications, toolkit. Edit content here only. |
| `app/page.tsx` | Composes the page. It's a server component. |
| `components/site/` | Sections in page order (hero, work, experience, more work, about, contact) plus the nav. Most are server components. |
| `components/motion/` | Small client islands: Lenis smooth scroll, the reveal observer, and the switch to navy for About and Contact. |
| `components/scene/` | The sculpture. `states.ts` builds the procedural states, and `sculpture.ts` is the vanilla three.js engine. |

## The drawing

The 3D layer is one passage of play on one pitch, drawn as points and lines and morphed on the GPU. Every state places the same nodes. The pitch markings (to scale), both goals and a 4-3-3 never move; only the ball travels and the yellow trail of passes grows behind it. Reading the page plays the move out:

0. kick-off, filmed low behind the ball (hero)
1. out to the left wing (project 01)
2. a switch of play to the right (project 02)
3. into the striker (project 03)
4. and 5. wide, faint shots while you read Experience and More work
6. the ball in the back of the net, filmed from behind the goal (About and Contact)

The camera follows the ball. On wide screens it pans so the action sits beside the text, not under it. Any element with `data-scene="N"` holds state `N` while it fills the viewport. Any element with `data-scene-quiet` fades the drawing while it crosses the middle of the screen.

three.js loads with a dynamic import after hydration. Narrow and touch screens get half the nodes, a capped pixel ratio and a pulled-back camera. With `prefers-reduced-motion` the drawing snaps between states, Lenis stays off, and every reveal is shown immediately.

## Colour and Chelsea

The page is Chelsea blue (#034694) with cream text, and yellow (#f5c518) is the only accent. About and Contact drop to a deeper navy. Chelsea is otherwise carried by the football thread and a few small details: shirt-number project numbers, season labels on experience dates, one line in About, and a "KTBFFH" in the footer.
