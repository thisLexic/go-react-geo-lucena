package main

import (
	"net/http"

	"github.com/julienschmidt/httprouter"
)

func (app *application) routes() http.Handler {
	router := httprouter.New()

	router.HandlerFunc(http.MethodGet, "/status", app.statusHandler)

	router.HandlerFunc(http.MethodGet, "/v1/area/:id", app.getOneArea)
	router.HandlerFunc(http.MethodGet, "/v1/areas", app.getAllAreas)
	router.HandlerFunc(http.MethodGet, "/v1/areas/:risk_id", app.getAllAreasByRisk)

	router.HandlerFunc(http.MethodGet, "/v1/risks", app.getAllRisks)

	return app.enableCORS(router)
}
