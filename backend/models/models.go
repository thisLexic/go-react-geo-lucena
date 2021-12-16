package models

import (
	"database/sql"
	"time"
)

// Models is the wrapper for the database
type Models struct {
	DB DBModel
}

// NewModels returns Models with db pool
func NewModels(db *sql.DB) Models {
	return Models{
		DB: DBModel{DB: db},
	}
}

// Risk is the type for risks
type Risk struct {
	ID        int       `json:"-"`
	Name      string    `json:"name"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}

// AreaRisk is the type for the risk of an area
type AreaRisk struct {
	ID        int       `json:"id"`
	AreaID    int       `json:"area_id"`
	RiskID    int       `json:"risk_id"`
	Risk      Risk      `json:"risk"`
	CreatedAt time.Time `json:"created_at"`
	UpdatedAt time.Time `json:"updated_at"`
}

// Area is the type for areas
type Area struct {
	ID          int        `json:"id"`
	Description string     `json:"description"`
	CreatedAt   time.Time  `json:"-"`
	UpdatedAt   time.Time  `json:"-"`
	Edges       []AreaEdge `json:"edges"`
	Risks       []Risk     `json:"risks"`
}

// AreaEdge is the edge of an area
type AreaEdge struct {
	ID        int       `json:"-"`
	AreaID    int       `json:"-"`
	Latitude  float64   `json:"lat"`
	Longitude float64   `json:"lng"`
	CreatedAt time.Time `json:"-"`
	UpdatedAt time.Time `json:"-"`
}
