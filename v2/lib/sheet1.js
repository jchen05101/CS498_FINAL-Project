var opt2 = {
  mode: "vega",
  actions: false
};

var configSpec = {
  "$schema": "https://vega.github.io/schema/vega/v3.0.json",
  "autosize": "pad",
  "padding": 5,
  "encode": {
    "update": {
      "stroke": {
        "value": "#ccc"
      },
      "fill": {
        "value": "transparent"
      }
    }
  },
  "data": [
    {
      "name": "paintbrush_store"
    },
    {
      "name": "source_0",
      "url": "/v2/data/Sheet_1_data.csv",
      "format": {
        "type": "csv",
        "parse": {
          "avg_happiness_score": "number",
          "avg_log_gdp_per_capita": "number"
        }
      },
      "transform": [
        {
          "type": "filter",
          "expr": "datum[\"avg_happiness_score\"] !== null && !isNaN(datum[\"avg_happiness_score\"]) && datum[\"avg_log_gdp_per_capita\"] !== null && !isNaN(datum[\"avg_log_gdp_per_capita\"])"
        }
      ]
    }
  ],
  "signals": [
    {
      "name": "width",
      "update": "960"
    },
    {
      "name": "height",
      "update": "540"
    },
    {
      "name": "unit",
      "value": {},
      "on": [
        {
          "events": "mousemove",
          "update": "group()._id ? group() : unit"
        }
      ]
    },
    {
      "name": "paintbrush_tuple",
      "value": {},
      "on": [
        {
          "events": [
            {
              "source": "scope",
              "type": "mouseover"
            }
          ],
          "update": "datum && {unit: \"\", encodings: [], fields: [\"_id\"], values: [datum[\"_id\"]]}"
        }
      ]
    },
    {
      "name": "paintbrush_toggle",
      "value": false,
      "on": [
        {
          "events": [
            {
              "source": "scope",
              "type": "mouseover"
            }
          ],
          "update": "event.shiftKey"
        }
      ]
    },
    {
      "name": "paintbrush_modify",
      "on": [
        {
          "events": {
            "signal": "paintbrush_tuple"
          },
          "update": "modify(\"paintbrush_store\", paintbrush_toggle ? null : paintbrush_tuple, paintbrush_toggle ? null : true, paintbrush_toggle ? paintbrush_tuple : null)"
        }
      ]
    }
  ],
  "marks": [
    {
      "name": "marks",
      "type": "symbol",
      "role": "point",
      "from": {
        "data": "source_0"
      },
      "encode": {
        "update": {
          "x": {
            "scale": "x",
            "field": "avg_log_gdp_per_capita"
          },
          "y": {
            "scale": "y",
            "field": "avg_happiness_score"
          },
          "stroke": {
            "value": "#4c78a8"
          },
          "fill": {
            "value": "transparent"
          },
          "size": [
            {
              "test": "vlPoint(\"paintbrush_store\", \"\", datum, \"union\", \"all\")",
              "value": 300
            },
            {
              "value": 50
            }
          ],
          "opacity": {
            "value": 0.7
          }
        }
      }
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "linear",
      "domain": {
        "data": "source_0",
        "field": "avg_log_gdp_per_capita"
      },
      "range": [
        0,
        {
          "signal": "width"
        }
      ],
      "round": true,
      "nice": true,
      "zero": false
    },
    {
      "name": "y",
      "type": "linear",
      "domain": {
        "data": "source_0",
        "field": "avg_happiness_score"
      },
      "range": [
        {
          "signal": "height"
        },
        0
      ],
      "round": true,
      "nice": true,
      "zero": false
    }
  ],
  "axes": [
    {
      "scale": "x",
      "labelOverlap": true,
      "maxExtent": 30,
      "minExtent": 30,
      "orient": "bottom",
      "tickCount": 5,
      "title": "Avg. Log GDP per capita",
      "zindex": 1
    },
    {
      "scale": "x",
      "domain": false,
      "grid": true,
      "labels": false,
      "orient": "bottom",
      "tickCount": 5,
      "ticks": false,
      "zindex": 0,
      "gridScale": "y"
    },
    {
      "scale": "y",
      "maxExtent": 30,
      "minExtent": 30,
      "orient": "left",
      "title": "Avg. Happiness score",
      "zindex": 1
    },
    {
      "scale": "y",
      "domain": false,
      "grid": true,
      "labels": false,
      "orient": "left",
      "ticks": false,
      "zindex": 0,
      "gridScale": "x"
    }
  ],
  "config": {
    "axis": {
      "quantitativeExtent": 30
    }
  }
}

vega.embed('#sheet1Vis', configSpec, opt2, function (error, result, opt2) {
  // result.view is the Vega View
  vegaTooltip.vega(result.view, opt2);
});