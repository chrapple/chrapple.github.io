// Load data from datasets/videogames_wide.csv using d3.csv and then make visualizations
async function fetchData() {
  const data = await d3.csv("./dataset/videogames_wide.csv");
  return data;
}

fetchData().then(async (data) => {

    // question 1
  const vlSpec = vl.markCircle()
    .data(data)
    .title("Platform vs Genre")
    .encode(
      vl.x().fieldN("Platform"),
      vl.y().fieldN("Genre"),
      vl.color().value("blue").fieldQ("Global_Sales").title("Global sales (millions)").aggregate("sum"),
      vl.size().fieldQ("Global_Sales").title("Global sales (millions)").aggregate("sum"),
      vl.tooltip([
        vl.fieldN("Genre"),
        vl.fieldN("Platform"),
        vl.size().fieldQ("Global_Sales").title("Global sales (millions)").aggregate("sum"),
        ])
    )
    .width("container")
    .height(400)
    .toSpec();

    // question 2
  const vlSpec2 = vl
    .markLine()
    .data(data)
    .transform(
        vl.filter("datum.Year !== 'N/A'")
    )
    .title("Sales over time by genre")
    .encode(
    vl.x().fieldO("Year").title("Year of release"),
    vl.y().fieldQ("Global_Sales").title("Global sales (millions)").aggregate("sum"),
    vl.color().fieldN("Genre"),
    vl.shape().fieldN("Genre"),
    vl.tooltip([
      vl.fieldN("Genre"),
      vl.fieldO("Year")
    ])
    )
    .width("container")
    .height(400)
    .toSpec();

    const vlSpec3 = vl
    .markLine()
    .data(data)
    .transform(
        vl.filter("datum.Year !== 'N/A'")
    )
    .title("Sales over time by platform")
    .encode(
    vl.x().fieldO("Year").title("Year of release"),
    vl.y().fieldQ("Global_Sales").title("Global sales (millions)").aggregate("sum"),
    vl.color().fieldN("Platform").legend(
      {orient: "left"}
    ),
    vl.shape().fieldN("Platform").legend(
      {orient: "right"}
    ),
    vl.tooltip([
      vl.fieldN("Platform"),
      vl.fieldO("Year")
    ])
    )
    .width("container")
    .height(400)
    .toSpec();

    // question 3
    const vlSpec4 = vl
    .markTick()
    .data(data)
    .title("Regional Sales vs Platform")
    .encode(
    vl.x().fieldN("Platform"),
    vl.y().fieldQ("Global_Sales").title("Global Sales (millions)"),
    vl.color().condition(
      {test : "datum['JP_Sales'] > datum['NA_Sales'] && datum['JP_Sales'] > datum['EU_Sales'] && datum['JP_Sales'] > datum['Other_Sales']", value: "red"},
      {test : "datum['NA_Sales'] > datum['JP_Sales'] && datum['NA_Sales'] > datum['EU_Sales'] && datum['NA_Sales'] > datum['Other_Sales']", value: "orange"},
      {test : "datum['EU_Sales'] > datum['JP_Sales'] && datum['EU_Sales'] > datum['NA_Sales'] && datum['EU_Sales'] > datum['Other_Sales']", value: "green"}
    ),
      vl.tooltip([
      vl.fieldN("Name"),
      vl.size().fieldQ("Global_Sales").title("Global sales (millions)"),
      vl.color().fieldQ("NA_Sales").title("NA Sales (millions)"),
      vl.color().fieldQ("JP_Sales").title("Japan Sales (millions)"),
      vl.color().fieldQ("EU_Sales").title("Europe Sales (millions)"),
      vl.color().fieldQ("Other_Sales").title("Other Sales (millions)")
    ])
    )
    .width("container")
    .height(400)
    .toSpec();

    // question 4
    const vlSpec5 = vl
    .markPoint()
    .data(data)
    .transform(
        vl.filter("datum.Genre == 'Role-Playing'")
    )
    .title("NA Sales vs JP Sales of Role-Playing games")
    .encode(
    vl.y().fieldQ("NA_Sales").title("North America Sales (millions)"),
    vl.x().fieldQ("JP_Sales").title("Japanese Sales (millions)"),
    vl.color().condition(
      {test : "datum['JP_Sales'] > datum['NA_Sales']", value: "red"}
    ),
    vl.tooltip([
      vl.fieldN("Name"),
      vl.fieldN("Genre"),
      vl.x().fieldQ("JP_Sales").title("JP Sales"),
      vl.y().fieldQ("NA_Sales").title("NA Sales")
    ])
    )
    .width("container")
    .height(400)
    .toSpec();

  render("#vis1", vlSpec);
  render("#vis2", vlSpec2);
  render("#vis3", vlSpec3);
  render("#vis4", vlSpec4);
  render("#vis5", vlSpec5);
});

async function render(viewID, spec) {
  const result = await vegaEmbed(viewID, spec);
  result.view.run();
}