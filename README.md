# CSV filter

Command-line utility to filter CSV rows. API loosely modeled after
[csvkit](https://github.com/onyxfish/csvkit).

Very much in development.

## Installation

npm install -g

## Usage

```
csvfilter -c time -f 'return d === "true";' test.csv
```
