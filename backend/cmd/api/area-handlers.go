package main

import (
	"errors"
	"net/http"
	"strconv"

	"github.com/julienschmidt/httprouter"
)

func (app *application) getOneArea(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	id, err := strconv.Atoi(params.ByName("id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	area, err := app.models.DB.AreaGet(id)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, area, "area")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllAreas(w http.ResponseWriter, r *http.Request) {
	areas, err := app.models.DB.AreasAll()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, areas, "areas")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}

func (app *application) getAllRisks(w http.ResponseWriter, r *http.Request) {
	risks, err := app.models.DB.RisksAll()
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, risks, "risks")
	if err != nil {
		app.errorJSON(w, err)
		return
	}

}

func (app *application) getAllAreasByRisk(w http.ResponseWriter, r *http.Request) {
	params := httprouter.ParamsFromContext(r.Context())

	riskId, err := strconv.Atoi(params.ByName("risk_id"))
	if err != nil {
		app.logger.Print(errors.New("invalid id parameter"))
		app.errorJSON(w, err)
		return
	}

	areas, err := app.models.DB.AreasAll(riskId)
	if err != nil {
		app.errorJSON(w, err)
		return
	}

	err = app.writeJSON(w, http.StatusOK, areas, "areas")
	if err != nil {
		app.errorJSON(w, err)
		return
	}
}
