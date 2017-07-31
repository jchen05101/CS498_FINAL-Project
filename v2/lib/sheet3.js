var opt2 = {
  mode: "vega",
  actions: false
};

var vSpec = {
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
      "name": "source_0",
      "url": "/v2/data/Sheet_3_data.csv",
      "format": {
        "type": "csv",
        "delimiter": ","
      }
    },
    {
      "name": "data_0",
      "source": "source_0",
      "transform": [
        {
          "type": "formula",
          "expr": "toNumber(datum[\"Happiness_score\"])",
          "as": "Happiness_score"
        }
      ]
    },
    {
      "name": "data_1",
      "source": "data_0",
      "transform": [
        {
          "type": "aggregate",
          "groupby": [
            "country"
          ],
          "ops": [
            "mean"
          ],
          "fields": [
            "Happiness_score"
          ],
          "as": [
            "mean_Happiness_score"
          ]
        }
      ]
    },
    {
      "name": "data_2",
      "source": "source_0",
      "transform": [
        {
          "type": "formula",
          "expr": "toNumber(datum[\"household\"])",
          "as": "household"
        },
        {
          "type": "aggregate",
          "groupby": [
            "country"
          ],
          "ops": [
            "mean"
          ],
          "fields": [
            "household"
          ],
          "as": [
            "mean_household"
          ]
        }
      ]
    }
  ],
  "signals": [
    {
      "name": "x_step",
      "value": 21
    },
    {
      "name": "width",
      "update": "bandspace(domain('x').length, 0.1, 0.05) * x_step"
    },
    {
      "name": "height",
      "update": "250"
    }
  ],
  "marks": [
    {
      "name": "layer_0_marks",
      "type": "rect",
      "role": "bar",
      "from": {
        "data": "data_1"
      },
      "encode": {
        "update": {
          "x": {
            "scale": "x",
            "field": "country"
          },
          "width": {
            "scale": "x",
            "band": true
          },
          "y": {
            "scale": "layer_0_y",
            "field": "mean_Happiness_score"
          },
          "y2": {
            "scale": "layer_0_y",
            "value": 0
          },
          "fill": {
            "value": "#4c78a8"
          }
        }
      },
      "clip": true
    },
    {
      "name": "layer_1_marks",
      "type": "symbol",
      "role": "point",
      "from": {
        "data": "data_2"
      },
      "encode": {
        "update": {
          "x": {
            "scale": "x",
            "field": "country",
            "band": 0.5
          },
          "y": {
            "scale": "layer_1_y",
            "field": "mean_household"
          },
          "stroke": {
            "value": "firebrick"
          },
          "fill": {
            "value": "transparent"
          }
        }
      },
      "clip": true
    }
  ],
  "scales": [
    {
      "name": "x",
      "type": "band",
      "domain": {
        "data": "data_1",
        "field": "country",
        "sort": {
          "op": "mean",
          "field": "mean_Happiness_score",
          "order": "descending"
        }
      },
      "range": {
        "step": {
          "signal": "x_step"
        }
      },
      "round": true,
      "paddingInner": 0.1,
      "paddingOuter": 0.05
    },
    {
      "name": "layer_0_y",
      "type": "linear",
      "domain": {
        "data": "data_1",
        "field": "mean_Happiness_score"
      },
      "range": [
        {
          "signal": "height"
        },
        0
      ],
      "round": true,
      "nice": true,
      "zero": true
    },
    {
      "name": "layer_1_y",
      "type": "linear",
      "domain": {
        "data": "data_2",
        "field": "mean_household"
      },
      "range": [
        {
          "signal": "height"
        },
        0
      ],
      "zero": false,
      "round": true,
      "nice": true
    }
  ],
  "axes": [
    {
      "scale": "x",
      "orient": "bottom",
      "tickCount": 5,
      "title": "Country",
      "zindex": 1,
      "encode": {
        "labels": {
          "update": {
            "text": {
              "signal": "datum.value"
            },
            "angle": {
              "value": 270
            },
            "align": {
              "value": "right"
            },
            "baseline": {
              "value": "middle"
            }
          }
        }
      }
    },
    {
      "scale": "layer_0_y",
      "maxExtent": 30,
      "minExtent": 30,
      "orient": "left",
      "title": "Happiness score",
      "zindex": 1
    },
    {
      "scale": "layer_1_y",
      "maxExtent": 30,
      "minExtent": 30,
      "orient": "right",
      "title": "Healthy life expectancy at birth",
      "zindex": 1
    }
  ],
  "config": {
    "axis": {
      "quantitativeExtent": 30
    }
  }
}

var tmpSpec = {
  "$schema": "https://vega.github.io/schema/vega-lite/v2.json",
  "data": { "url": "/v2/data/Sheet_3_data.csv" },
  "layer": [
    {
      "mark": "bar",
      "encoding": {
        "x": {
          "field": "country",
          "type": "ordinal",
          "sort": { "op": "mean", "field": "household", "order": "descending" }
        },
        "y": {
          "aggregate": "mean",
          "field": "household",
          "type": "quantitative"
        }
      }
    },
    {
      "mark": "point",
      "encoding": {
        "x": {
          "field": "country",
          "type": "ordinal",
          "sort": { "op": "mean", "field": "household", "order": "descending" }
        },
        "y": {
          "aggregate": "mean",
          "field": "Happiness_score",
          "type": "quantitative",
          "axes": {
            "grid": "false",
          }
        },
        "color": { "value": "firebrick" }
      }
    }
  ],
  "resolve": {
    "y": { "scale": "independent" }
  }
}

vega.embed('#sheet3Vis', vSpec, opt2, function (error, result, opt2) {
  // result.view is the Vega View
  vegaTooltip.vega(result.view, opt2);
});