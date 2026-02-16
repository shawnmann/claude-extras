---
name: explain-code
description: Explain a file or function with analogies and ASCII diagrams
allowed-tools: Read, Grep, Glob
---

Explain the code specified in $ARGUMENTS. The argument can be a file path, a function name, or a class name.

Structure your explanation like this:

1. **One-liner**: What does this code do in one sentence?
2. **Analogy**: Explain the core concept using a real-world analogy.
3. **ASCII diagram**: Draw a simple ASCII diagram showing the flow or structure (data flow, call graph, state machine, etc. — pick whatever fits best).
4. **Step-by-step walkthrough**: Walk through the code in logical order, explaining each key section.
5. **Gotchas**: Call out anything surprising, tricky, or easy to misunderstand.

If $ARGUMENTS is empty, ask the user what they'd like explained.

Keep the explanation accessible — assume the reader is familiar with programming but not this specific codebase.
