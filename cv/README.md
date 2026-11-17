# CV source

`assets/CV-EHS.pdf` is generated from `CV-EHS.html`.

    ./cv/build.sh       # rebuild the PDF
    ./cv/check-fit.sh   # verify no page is clipped by the bottom margin

The layout mirrors the original Apple Pages document: A4, grey label column
right-aligned at 231.7pt, content column 250pt-505pt, 16pt baseline grid,
Avenir Next Bold/Regular (a macOS system font). Pages are fixed-height with
`overflow: hidden`, so content that no longer fits is silently clipped - always
run `check-fit.sh` after editing copy.
