<template>
  <div
    class="popup__wrapper"
    v-if="popupShow"
    @click.self="closePopup"
  >
    <div class="popup__body">
      <div @click="closePopup">
        <CloseIcon
          class="popup__close"
          :width="20 / 13.5 + 'rem'"
          :height="20 / 13.5 + 'rem'"
        />
      </div>
      <template v-if="lang == 'en'">
        <div class="info__block">
          <h1
            id="citation-title"
            class="info__title"
          >Citation</h1>
          <p
            id="citation-text"
            class="info__text"
          >
            When using pictures and graph data of climate projections, refer to the Climate Change Viewer platform
            (climate.uhmi.org.ua)
            <br />
            When using historical temperature observations, refer to the article in Data in Brief:
            <br />
            Osypov, V., Filippov, N., Mossur, H., Ahafonov, Y., Skrynyk, O., Osadcha, N., Osadchyi, V., 2025. Climate Change Viewer: User-Friendly Web Tool for Climate Change Tracking in Ukraine. Geomatics Environ. Eng. 19, 49–70. 
            <a class="info__link" href="https://doi.org/10.7494/geom.2025.19.5.49">https://doi.org/10.7494/geom.2025.19.5.49</a>
          </p>
        </div>
        <div class="info__block">
          <h1
            id="climateProj-title"
            class="info__title"
          >Climate projections</h1>
          <div>
            <p
              id="climateProjections-text"
              class="info__text"
            >
              Climate projections of temperature and precipitation were taken from the
              Euro-CORDEX initiative that provides high-resolution (0.11° grid)
              bias-adjusted regional climate models (RCMs) (<a
                id="climateProj-link"
                class="info__link"
                target="_blank"
                href="https://doi.org/10.1007/s10113-013-0499-2"
              >Jacob, 2014</a>) forced by five CMIP5 general circulation models (<a
                class="info__link"
                target="_blank"
                href="https://doi.org/10.1175/BAMS-D-11-00094.1"
              >Mora, 2013</a>) and state-of-the-art representative concentration pathways (RCP) 4.5 and
              RCP8.5 scenarios (<a
                class="info__link"
                target="_blank"
                href="https://doi.org/10.1038/nature08823"
              >Moss, 2010</a>). The overall ensemble includes 32 RCMs (Table 1). Grid nodes were
              averaged within administrative units and river basins.
            </p>
            <p class="info__table-title">
              <b>Table 1.</b> List of regional climate models (RCMs) forced by General
              circulation models (GCMs) used in Climate Change Viewer.
            </p>
            <table
              class="info__table"
              id="climateProj-table"
            >
              <tr
                class="info__table_tr-th"
                @click="toggleTable"
              >
                <th class="info__table_th">General circulation model</th>
                <th class="info__table_th">Initial conditions</th>
                <th class="info__table_th">Regional climate model</th>
                <th class="info__table_th">Bias-correction method</th>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">ARPEGE51</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">ARPEGE51</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r3i1p1</td>
                <td class="info__table_td">HIRHAM5</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r3i1p1</td>
                <td class="info__table_td">HIRHAM5</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r3i1p1</td>
                <td class="info__table_td">HIRHAM5</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">WRF331F</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">WRF331F</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">REMO2009</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">REMO2009</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
            </table>
          </div>
        </div>
        <div
          class="info__block"
          id="glossary"
        >
          <h1
            id="glossary-title"
            class="info__title"
          >Glossary</h1>
          <div>
            <p
              id="glossary-text"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle"
                class="info__subtitle italics"
              >Anomalies</span>
            <div class="info__text_collapse">
              represent the departures of specific measurements and/or forecasts from
              their long-term climatological values. Anomalies describe how much a
              specific variable differs from its normal state. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >Climate4Impact</a>)
            </div>
            </p>
            <p
              id="glossary-text-2"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-2"
                class="info__subtitle italics"
              >Climate Model</span>
            <div class="info__text_collapse">
              - a numerical representation of the climate system based on the physical,
              chemical, and biological properties of its components, their interactions
              and feedback processes, and accounting for all or some of its known
              properties. The climate system can be represented by models of varying
              complexity, that is, for any one component or combination of components a
              spectrum or hierarchy of models can be identified, differing in such aspects
              as the number of spatial dimensions, the extent to which physical, chemical,
              or biological processes are explicitly represented, or the level at which
              empirical parameterisations are involved. Coupled Atmosphere-Ocean General
              Circulation Models (AOGCMs) provide a comprehensive representation of the
              climate system that is near or at the most comprehensive end of the spectrum
              currently available. There is an evolution towards more complex models with
              interactive chemistry and biology. Climate models are applied, as a research
              tool, to study and simulate the climate, and for operational purposes,
              including monthly, seasonal, and interannual climate predictions. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-3"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-3"
                class="info__subtitle italics"
              >Climate Projection</span>
            <div class="info__text_collapse">
              - is the simulated response of the climate system to a scenario of future
              emission or concentration of greenhouse gases (GHGs) and aerosols, generally
              derived using climate models. Climate projections are distinguished from
              climate predictions in order to emphasize that climate projections depend
              upon the emission/concentration/radiative forcing scenario used, which are
              based on assumptions concerning, for example, future socioeconomic and
              technological developments that may or may not be realized. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-4"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-4"
                class="info__subtitle italics"
              >Climate reanalysis</span>
            <div class="info__text_collapse">
              - estimates of historical atmospheric, hydrographic or other climate
              relevant quantities, created by processing past climate data using fixed
              state-of-the-art weather forecasting or ocean circulation models with data
              assimilation techniques. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >Climate4Impact</a>)
            </div>
            </p>
            <p
              id="glossary-text-5"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-5"
                class="info__subtitle italics"
              >Emission Scenario</span>
            <div class="info__text_collapse">
              - a plausible representation of the future development of emissions of
              substances that are potentially radiatively active (e.g., greenhouse gases,
              aerosols), based on a coherent and internally consistent set of assumptions
              about driving forces (such as demographic and socioeconomic development,
              technological change, energy and land use) and their key relationships.
              Concentration scenarios, derived from emission scenarios, are used as input
              to a climate model to compute climate projections. In IPCC (1992) a set of
              emission scenarios was presented which were used as a basis for the climate
              projections in IPCC (1996). These emission scenarios are referred to as the
              IS92 scenarios. In the IPCC Special Report on Emission Scenarios
              (Nakicenovic and Swart, 2000) a new set of emission scenarios, the so-called
              SRES scenarios, were published, some of which were used, among others, as a
              basis for the climate projections presented in Chapters 9 to 11 of IPCC
              (2001) and Chapters 10 and 11 of IPCC (2007). New emission scenarios for
              climate change, the four Representative Concentration Pathways (RCPs), were
              developed for, but independently of, the fifth IPCC assessment. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-6"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-6"
                class="info__subtitle italics"
              >Ensemble</span>
            <div class="info__text_collapse">
              - a collection of model simulations characterizing a climate prediction or
              projection. Differences in initial conditions and model formulation result
              in different evolutions of the modelled system and may give information on
              uncertainty associated with model error and error in initial conditions in
              the case of climate forecasts and on uncertainty associated with model error
              and with internally generated climate variability in the case of climate
              projections. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-7"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-7"
                class="info__subtitle italics"
              >General Circulation Model (GCM):</span>
            <div class="info__text_collapse">
              Global Climate Models or General Circulation Models (GCMs) are based on the
              general physical principles of fluid dynamics and thermodynamics. They have
              their origin in numerical weather prediction and they describe the
              interactions between the components of the global climate system: the
              atmosphere, the oceans and a basic description of the land surface (i.e.
              aspects of the biosphere and the lithosphere that are relevant for the
              surface energy balance). For a detailed inventory and/or comparison of the
              various components in any of the current generation of GCMs please refer to
              ES-DOC Comparator. Sometimes GCMs are referred to as Coupled
              Atmosphere-Ocean GCMs (AOGCM). (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >EUPORIAS</a>)
            </div>
            </p>
            <p
              id="glossary-text-8"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-8"
                class="info__subtitle italics"
              >Greenhouse Gas:</span>
            <div class="info__text_collapse">
              Greenhouse gases are those gaseous constituents of the atmosphere, both
              natural and anthropogenic, that absorb and emit radiation at specific
              wavelengths within the spectrum of thermal infrared radiation emitted by the
              Earth's surface, the atmosphere itself, and by clouds. This property causes
              the greenhouse effect. Water vapour (H2O), carbon dioxide (CO2), nitrous
              oxide (N2O), methane (CH4) and ozone (O3) are the primary greenhouse gases
              in the Earth's atmosphere. Moreover, there are a number of entirely
              human-made greenhouse gases in the atmosphere, such as the halocarbons and
              other chlorine- and bromine-containing substances, dealt with under the
              Montreal Protocol. Beside CO2, N2O and CH4, the Kyoto Protocol deals with
              the greenhouse gases sulphur hexafluoride (SF6), hydrofluorocarbons (HFCs)
              and perfluorocarbons (PFCs). (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-9"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-9"
                class="info__subtitle italics"
              >Regional Climate Models (RCMs)</span>
            <div class="info__text_collapse">
              - climate model at higher resolution over a limited area. Such models are
              used in downscaling global model simulations over specific regions. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >Climate4Impact</a>)
            </div>
            </p>
            <p
              id="glossary-text-10"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-10"
                class="info__subtitle italics"
              >Representative Concentration Pathways (RCPs)</span>
            <div class="info__text_collapse">
              - scenarios that include time series of emissions and concentrations of the
              full suite of greenhouse gases (GHGs) and aerosols and chemically active
              gases, as well as land use/land cover (Moss et al., 2008). The word
              representative signifies that each RCP provides only one of many possible
              scenarios that would lead to the specific radiative forcing characteristics.
              The term pathway emphasises that not only the long-term concentration levels
              are of interest, but also the trajectory taken over time to reach that
              outcome (Moss et al., 2010). RCPs usually refer to the portion of the
              concentration pathway extending up to 2100, for which Integrated Assessment
              Models produced corresponding emission scenarios. Extended Concentration
              Pathways (ECPs) describe extensions of the RCPs from 2100 to 2500 that were
              calculated using simple rules generated by stakeholder consultations, and do
              not represent fully consistent scenarios. Four RCPs produced from Integrated
              Assessment Models were selected from the published literature and are used
              in the Fifth IPCC Assessment as a basis for the climate predictions and
              projections presented in WGI AR5 Chapters 11 to 14: RCP2.6: One pathway
              where radiative forcing peaks at approximately 3 W m-2 before 2100 and then
              declines (the corresponding ECP assuming constant emissions after 2100);
              RCP4.5 and RCP6.0: Two intermediate stabilisation pathways in which
              radiative forcing is stabilised at approximately 4.5 W m-2 and 6.0 W m-2
              after 2100 (the corresponding ECPs assuming constant concentrations after
              2150); RCP8.5: One high pathway for which radiative forcing reaches greater
              than 8.5 W m-2 by 2100 and continues to rise for some amount of time (the
              corresponding ECP assuming constant emissions after 2100 and constant
              concentrations after 2250). (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-11"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-11"
                class="info__subtitle italics"
              >Uncertainty (model uncertainty):</span>
            <div class="info__text_collapse">
              Models are always simplified representations of the earth’s climate system.
              Different models apply different physical parameterizations and also
              different numerical approaches. Those structural differences lead to a range
              of simulated climate responses to external forcing. They are addressed with
              multi-model-ensemble simulations (we used ensemble of 32 regional climate
              models in Climate Change Viewer). Multi-model ensemble simulations based on
              a certain scenario, sample modelling uncertainties, but also different
              initial conditions of the climate system, as each global model is
              initialized at a different climate state. Also included under model
              uncertainty is the fact that different classes of models (e.g. dynamical vs.
              statistical downscaling) might give different results. (<a
                class="info__link"
                target="_blank"
                href="https://www.euro-cordex.net/imperia/md/content/csc/cordex/guidance_for_euro-cordex_climate_projections_data_use__2021-02_1_.pdf"
              >EURO-CORDEX Guidance</a>)
            </div>
            </p>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="info__block">
          <h1
            id="citation-title"
            class="info__title"
          >Цитування</h1>
          <p
            id="citation-text"
            class="info__text"
          >
            Під час використання малюнків та даних графіків кліматичних проєкцій посилатися на платформу Climate Change
            Viewer (climate.uhmi.org.ua)
            <br />
            Під час використання історичних даних спостережень за температурою посилатися на статтю у Data in Brief:
            <br />
            Osypov, V., Filippov, N., Mossur, H., Ahafonov, Y., Skrynyk, O., Osadcha, N., Osadchyi, V., 2025. Climate Change Viewer: User-Friendly Web Tool for Climate Change Tracking in Ukraine. Geomatics Environ. Eng. 19, 49–70. 
            <a class="info__link" href="https://doi.org/10.7494/geom.2025.19.5.49">https://doi.org/10.7494/geom.2025.19.5.49</a>
          </p>
        </div>
        <div class="info__block">
          <h1
            id="climateProj-title"
            class="info__title"
          >Кліматичні проєкції</h1>
          <div>
            <p
              id="climateProjections-text"
              class="info__text"
            >
              Кліматичні проєкції температури та опадів були взяті з проєкту Euro-CORDEX, який надає регіоналізовані
              кліматичні моделі (РКМ) з високою роздільною здатністю (сітка 0,11°) (<a
                id="climateProj-link"
                class="info__link"
                target="_blank"
                href="https://doi.org/10.1007/s10113-013-0499-2"
              >Jacob, 2014</a>), що керуються п’ятьма моделями загальної циркуляції атмосфери й океанів із проєкту CMIP5 (<a
                class="info__link"
                target="_blank"
                href="https://doi.org/10.1175/BAMS-D-11-00094.1"
              >Mora, 2013</a>) та двома сценаріями викидів парникових газіва та аерозолей RCP4.5 і RCP8.5 (<a
                class="info__link"
                target="_blank"
                href="https://doi.org/10.1038/nature08823"
              >Moss, 2010</a>). Загальний ансамбль включає 32 РКМ (табл. 1). Вузли сітки були усереднені в межах адміністративних одиниць і річкових басейнів.
            </p>
            <p class="info__table-title">
              <b>Таблиця 1.</b> Перелік регіональних кліматичних моделей (РКМ), що керуються моделями загальної циркуляції атмосфери й океанів (МЗЦАО) та використані у Climate Change Viewer.
            </p>
            <table
              class="info__table"
              id="climateProj-table"
            >
              <tr
                class="info__table_tr-th"
                @click="toggleTable"
              >
                <th class="info__table_th">Модель загальної циркуляції</th>
                <th class="info__table_th">Початкові умови</th>
                <th class="info__table_th">Регіональна кліматична модель</th>
                <th class="info__table_th">Метод bias-корекції</th>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">ARPEGE51</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">ARPEGE51</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">CNRM-CM5</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r12i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r3i1p1</td>
                <td class="info__table_td">HIRHAM5</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r3i1p1</td>
                <td class="info__table_td">HIRHAM5</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">EC-EARTH</td>
                <td class="info__table_td">r3i1p1</td>
                <td class="info__table_td">HIRHAM5</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">WRF331F</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">WRF331F</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">IPSL-CM5A-MR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RACMO22E</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">HadGEM2-ES</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">CCLM4-8-17</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">REMO2009</td>
                <td class="info__table_td">v1-IPSL-CDFT21-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">REMO2009</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-SMHI-DBS45-MESAN</td>
              </tr>
              <tr class="info__table_tr-td">
                <td class="info__table_td">MPI-ESM-LR</td>
                <td class="info__table_td">r1i1p1</td>
                <td class="info__table_td">RCA4</td>
                <td class="info__table_td">v1-IPSL-CDFT22-WFDEI</td>
              </tr>
            </table>
          </div>
        </div>
        <div
          class="info__block"
          id="glossary"
        >
          <h1
            id="glossary-title"
            class="info__title"
          >Глосарій</h1>
          <div>
            <p
              id="glossary-text"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle"
                class="info__subtitle italics"
              >Аномалії</span>
            <div class="info__text_collapse">
              представляють відхилення конкретних вимірювань та/або прогнозів від їхніх довгострокових кліматологічних значень. Аномалії описують, наскільки конкретна змінна відрізняється від свого нормального стану.  (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >Climate4Impact</a>)
            </div>
            </p>
            <p
              id="glossary-text-2"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-2"
                class="info__subtitle italics"
              >Кліматична модель</span>
            <div class="info__text_collapse">
              - це числове відображення кліматичної системи на основі фізичних, хімічних і біологічних властивостей її компонентів, їх взаємодій та зворотних процесів, а також з урахуванням усіх або деяких відомих властивостей. Кліматичну систему можна представити моделями різної складності, тобто для будь-якого одного компонента або комбінації компонентів можна визначити спектр або ієрархію моделей, які відрізняються такими аспектами, як кількість просторових вимірів, ступінь, до якого фізичні, хімічні або біологічні процеси явно представлені, або рівень, на якому залучені емпіричні параметризації. Зв'язані моделі загального циркуляції атмосфери-океану (МЗЦАО) забезпечують комплексне представлення кліматичної системи, яке знаходиться близько або на найбільш комплексному кінці спектру, доступного на сьогодні. Є еволюція до більш складних моделей з інтерактивною хімією та біологією. Кліматичні моделі застосовуються, як дослідницький інструмент, для вивчення та моделювання клімату, а також для оперативних цілей, включаючи щомісячні, сезонні та міжрічні кліматичні прогнози. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-3"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-3"
                class="info__subtitle italics"
              >Кліматична проєкція</span>
            <div class="info__text_collapse">
              - це симуляція кліматичної системи за сценарію майбутнього викиду або концентрації парникових газів (ПГ) та аерозолів, як правило, отримана за допомогою кліматичних моделей. Кліматичні проєкції відрізняють від кліматичних передбачень, щоб підкреслити, що кліматичні проєкції залежать від використаного сценарію викидів/концентрації/радіаційного впливу, які ґрунтуються на припущеннях, наприклад, щодо майбутнього соціоекономічного та технологічного розвитку, які можуть бути або не бути реалізовані. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-4"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-4"
                class="info__subtitle italics"
              >Кліматичний реаналіз</span>
            <div class="info__text_collapse">
              - оцінки історичних атмосферних, гідрографічних або інших кліматично важливих величин, створені шляхом обробки минулих кліматичних даних за допомогою фіксованих моделей прогнозування погоди або моделей циркуляції океану з використанням методів асиміляції даних. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >Climate4Impact</a>)
            </div>
            </p>
            <p
              id="glossary-text-5"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-5"
                class="info__subtitle italics"
              >Сценарій викидів</span>
            <div class="info__text_collapse">
              - це правдоподібне представлення майбутнього розвитку викидів речовин, які потенційно можуть впливати на радіацію (наприклад, парникові гази, аерозолі), на основі послідовного та внутрішньо-послідовного набору припущень щодо рушійних сил (таких як демографічний та соціоекономічний розвиток, технологічні зміни, використання енергії та земельних ресурсів) та їхніх ключових зв'язків. Сценарії концентрації, отримані з сценаріїв викидів, використовуються як вхідні дані для кліматичної моделі для розрахунку кліматичних прогнозів. У IPCC (1992) був представлений набір сценаріїв викидів, які були використані як основа для кліматичних прогнозів у IPCC (1996). Ці сценарії викидів називаються сценаріями IS92. У Спеціальному звіті IPCC про сценарії викидів (Nakicenovic та Swart, 2000) був опублікований новий набір сценаріїв викидів, так звані сценарії SRES, деякі з яких були використані, серед іншого, як основа для кліматичних прогнозів, представлених у главах 9-11 IPCC (2001) та главах 10 та 11 IPCC (2007). Нові сценарії викидів для зміни клімату, чотири представницькі шляхи концентрації (RCPs), були розроблені для, але незалежно від, п'ятого оціночного звіту IPCC. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-6"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-6"
                class="info__subtitle italics"
              >Ансамбль</span>
            <div class="info__text_collapse">
              - це набір симуляцій моделей, які характеризують кліматичний прогноз або проекцію. Різниця в початкових умовах та формулюванні моделі призводить до різних еволюцій модельованої системи та може давати інформацію про невизначеність, пов'язану з помилкою моделі та помилкою в початкових умовах у випадку кліматичних прогнозів, а також про невизначеність, пов'язану з помилкою моделі та з внутрішньою мінливістю клімату у випадку кліматичних проекцій. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-7"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-7"
                class="info__subtitle italics"
              >Загальна модель циркуляції атмосфери та океанів (МЗЦАО):</span>
            <div class="info__text_collapse">
              Глобальні кліматичні моделі або Загальні моделі циркуляції базуються на загальних фізичних принципах динаміки рідин і термодинаміки. Вони походять від числового прогнозування погоди і описують взаємодії між компонентами глобальної кліматичної системи: атмосферою, океанами та основним описом поверхні землі (тобто аспектами біосфери та літосфери, які мають значення для балансу енергії на поверхні). (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >EUPORIAS</a>)
            </div>
            </p>
            <p
              id="glossary-text-8"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-8"
                class="info__subtitle italics"
              >Парникові гази:</span>
            <div class="info__text_collapse">
              - це газоподібні складові атмосфери, як природні, так і антропогенні, що поглинають та випромінюють радіацію на конкретних довжинах хвиль у спектрі теплового інфрачервоного випромінювання, що випромінюється поверхнею Землі, самою атмосферою та хмарами. Ця властивість викликає парниковий ефект. Водяна пара (H2O), вуглекислий газ (CO2), закис азоту (N2O), метан (CH4) та озон (O3) є основними парниковими газами в атмосфері Землі. Крім того, в атмосфері є ряд повністю антропогенних парникових газів, таких як галогеновуглеводні та інші сполуки, що містять хлор та бром, які регулюються за Монреальським протоколом. Поряд з CO2, N2O та CH4, Кіотський протокол займається парниковими газами гексафторидом сірки (SF6), гідрофторвуглецями (HFC) та перфторвуглецями (PFC). (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-9"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-9"
                class="info__subtitle italics"
              >Регіональні кліматичні моделі (РКМ)</span>
            <div class="info__text_collapse">
              - кліматична модель кращої роздільної здатності на обмеженій території. Такі моделі використовуються для покращення масштабу глобальних модельних симуляцій у конкретних регіонах. (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >Climate4Impact</a>)
            </div>
            </p>
            <p
              id="glossary-text-10"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-10"
                class="info__subtitle italics"
              >Репрезентативні сценарії (шляхи) концентрації (RCPs)</span>
            <div class="info__text_collapse">
              - сценарії, які включають часові ряди викидів та концентрацій повного набору парникових газів (ПГ), аерозолів та хімічно активних газів, а також землекористування та рослинного покриву (Moss et al., 2008). Слово "репрезентативний" означає, що кожен RCP надає лише один з багатьох можливих сценаріїв, які призведуть до конкретних характеристик випромінювального впливу. Термін "шлях" підкреслює, що цікавлять не тільки довгострокові рівні концентрації, але й траєкторія, яка була пройдена з часом, щоб досягти цього результату (Moss et al., 2010). RCPs зазвичай стосуються частини шляху концентрації, який простягається до 2100 року, для якого Інтегровані Моделі Оцінки виробили відповідні сценарії викидів. Розширені Шляхи Концентрації (ECPs) описують розширення RCPs з 2100 до 2500 року, які були розраховані за допомогою простих правил, сформованих на основі консультацій із зацікавленими сторонами, і не представляють повністю послідовних сценаріїв. Чотири RCPs, створені за допомогою Інтегрованих Моделей Оцінки, були вибрані з опублікованої літератури і використовуються у П'ятому Оцінювальному Звіті IPCC як основа для кліматичних прогнозів та прогнозів, представлених у главах 11-14 WGI AR5: RCP2.6: Один шлях, де випромінювальний вплив досягає піку приблизно 3 Вт/м² до 2100 року, а потім знижується (відповідний ECP передбачає постійні викиди після 2100 року); RCP4.5 та RCP6.0: Два проміжних шляхи стабілізації, в яких випромінювальний вплив стабілізується приблизно на рівні 4.5 Вт/м² та 6.0 Вт/м² після 2100 року (відповідні ECPs передбачають постійні концентрації після 2150 року); RCP8.5: Один високий шлях, за якого випромінювальний вплив досягає більше ніж 8.5 Вт/м² до 2100 року та продовжує зростати протягом певного часу (відповідний ECP передбачає постійні викиди після 2100 року та постійні концентрації після 2250 року). (<a
                class="info__link"
                target="_blank"
                href="http://www.clipc.eu/getting-started/glossary"
              >IPCC</a>)
            </div>
            </p>
            <p
              id="glossary-text-11"
              class="info__text info__text--collapsed info__part"
              @click="toggleText"
            >
              <span
                id="glossary-subtitle-11"
                class="info__subtitle italics"
              >Невизначеність (невизначеність моделі):</span>
            <div class="info__text_collapse">
              Моделі завжди є спрощеними представленнями кліматичної системи Землі. Різні моделі застосовують різні фізичні параметризації та також різні чисельні підходи. Ці структурні відмінності призводять до різних симульованих кліматичних реакцій на зовнішній вплив. Вони вирішуються за допомогою багатомодельних ансамблевих симуляцій (ми використовували ансамбль з 32 регіональних кліматичних моделей у Climate Change Viewer). Також до невизначеності моделі включається той факт, що різні класи моделей (наприклад, динамічне проти статистичного пониження роздільності) можуть давати різні результати. (<a
                class="info__link"
                target="_blank"
                href="https://www.euro-cordex.net/imperia/md/content/csc/cordex/guidance_for_euro-cordex_climate_projections_data_use__2021-02_1_.pdf"
              >EURO-CORDEX Guidance</a>)
            </div>
            </p>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
/* Server import */
import { create } from "axios";
/* Absolute imports */
import qs from "qs";

import DataSpoiler from "../UiElements/DataSpoiler.vue";
import CloseIcon from "@/assets/icons/CloseIcon.vue";

export default {
  name: "PopupInfo.vue",
  props: {
    popupShow: {
      required: true,
      type: Boolean,
    },
  },
  data() {
    return {
      popupShowInside: false,
      serverUrl: "https://api.uhmi.org.ua/",
      serverKey:
        "eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyOTQwMjg5NywiaWF0IjoxNjI5NDAyODk3fQ.NRZxQT8LQws7vq5ZQAUZI4OZb37BAvvuvFb1Du8Nr2w",
      climateProj: {
        text: null,
        table: null,
        tableTitle: null,
      },
      glossary: null,
    };
  },
  watch: {
    async popupShow() {
      this.popupShowInside = this.popupShow;
    },
    popupShowInside() {
      if (this.popupShowInside !== this.popupShow) {
        this.$emit("update-popup-show", this.popupShowInside);
      }
    },
  },
  computed: {
    lang() {
      return this.$store.state.LangState.currLang;
    },
  },
  methods: {
    toggleTable() {
      document.querySelectorAll('.info__table_tr-td').forEach(tr => {
        tr.classList.toggle('info__table_tr-td--collapsed')
      })
    },
    toggleText() {
      document.querySelectorAll('#glossary .info__text').forEach(tr => {
        tr.classList.toggle('info__text--collapsed')
      })
    },
    closePopup() {
      this.popupShowInside = false;
    },
    async requestDataForInfo(params, type) {
      const myAxios = create({
        paramsSerializer: (params) =>
          qs.stringify(params, { arrayFormat: "repeat" }),
      });
      const res = await myAxios
        .get(`${this.serverUrl}${type}`, {
          params,
        })
        .then((res) => res.data);
      return res;
    },
    async getClimateProj() {
      const params = {
        page: "main_page",
        title: "Climate projections",
        key: this.serverKey,
      };
      let ClimateProj = await this.requestDataForInfo(params, "web_content");
      let splittedClimateProj = ClimateProj[0][
        "Climate projections"
      ][0][0].split("<template v-slot:title>");
      this.climateProj.text = splittedClimateProj[0];
      this.climateProj.table = splittedClimateProj[1].split("</template>")[1];
      this.climateProj.tableTitle =
        splittedClimateProj[1].split("</template>")[0];
    },
    async getGlossary() {
      const params = {
        page: "main_page",
        title: "Glossary",
        key: this.serverKey,
      };
      const Glossary = await this.requestDataForInfo(params, "web_content");
      this.glossary = Glossary[0]["Glossary"][0][0];
    },
    async getAllData() {
      await this.getClimateProj();
      await this.getGlossary();
    },
  },
  components: {
    DataSpoiler,
    CloseIcon,
  },
};
</script>

<style lang="scss">
@import "@/assets/styles/variables.scss";
@import "@/assets/styles/mixins.scss";

.popup__wrapper {
  width: 100%;
  height: 100%;
  position: absolute;
  background-color: rgba(0, 0, 0, 0.6);
  padding: 25px 75px;
  z-index: 5;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-content: center;
}

.popup__body {
  background-color: $main-white;
  color: $main-darkbrown;
  font-size: 1.5rem;
  font-weight: 500;
  padding: 25px;
  white-space: break-spaces;
  text-align: left;
  line-height: 1.3;
  position: relative;
  overflow-x: hidden;
  max-height: 100%;
  max-width: 1200px;
  border-radius: 6px;
}

.popup__close {
  appearance: none;
  outline: none;
  background-color: inherit;
  border: none;
  display: block;
  transition: all 0.2s ease-out 0s;
  position: absolute;
  right: 0;
  margin-right: 2rem;
  top: 1rem;
  cursor: pointer;
  @include flex-center();
}

.popup__close:hover {
  transform: scale(1.1);
}

.info__block {
  width: 100%;
  text-align: left;
  margin-bottom: 15px;
  white-space: normal;
}

.info__text {
  white-space: normal;
}

#glossary .info__text {
  &--collapsed+.info__text_collapse {
    display: none;
  }

  .info__subtitle {
    display: block;
    cursor: pointer;
  }
}

.info__title {
  font-size: 2rem;
  margin-bottom: 8px;
}

.info__subtitle {
  font-weight: bold;
}

.italics {
  font-style: italic;
}

.info__link {
  color: $main-blue;
  transition: all 0.2s ease-in-out 0s;

  &:hover {
    color: $main-darkbrown;
  }
}

.info__description {
  font-size: 1.3rem;
  text-align: center;
  font-weight: 400;
}

.info__table {
  padding: 15px 0;
  margin: 0 auto;
  width: 85%;
  border: 1px solid $main-darkbrown;
  border-collapse: collapse;
}

.info__wrapper-table {
  margin: 0 auto;
  margin-top: 20px;
  width: 85%;
  font-size: 1.5rem;
}

.info__table-title {
  white-space: normal;
}

.info__table_tr-th {
  cursor: pointer;
}

.info__table_th {
  background-color: $main-brown;
  color: $main-darkbrown;
  padding: 4px;
  padding-left: 6px;
  text-align: left;
  font-size: 1.45rem;
  border: 1px solid $main-darkbrown;
  border-width: 0 0px 1px 0;
}

.info__table_tr-td {
  &--collapsed {
    display: none;
  }
}

.info__table_td {
  font-size: 1.3rem;
  padding: 4px;
  padding-left: 6px;
}

.info__part {
  margin-bottom: 12px;
  margin-left: 10px;
}

.info__part:last-child {
  margin-bottom: 0;
}

.info__loading {
  position: relative;
  width: 100%;
  margin-top: 70px;
}

.spinner-wrapper {
  position: absolute;
  z-index: 1000;
  top: calc(50% - 25px);
  left: calc(50% - 25px);
}

.spinner {
  width: 50px;
  height: 50px;
  border-radius: 100%;
  border: calc(50px / 9) solid $main-darkbrown;
  animation: spin 0.5s ease-in-out infinite;
}

.spinner-dot {
  width: calc(50px / 9);
  height: calc(50px / 7);
  background-color: $main-brown;
  position: relative;
  top: 3%;
  transform: rotate(227deg);
}

@keyframes spin {
  0% {
    transform: rotate(0deg) scale(1);
  }

  100% {
    transform: rotate(360deg) scale(1.1);
  }
}
</style>
