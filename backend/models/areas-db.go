package models

import (
	"context"
	"database/sql"
	"time"
)

type DBModel struct {
	DB *sql.DB
}

// Get returns one area and error, if any
func (m *DBModel) AreaGet(id int) (*Area, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
	select id, description, created_at, updated_at 
	from area 
	where id = $1
	`
	row := m.DB.QueryRowContext(ctx, query, id)

	var area Area
	err := row.Scan(
		&area.ID,
		&area.Description,
		&area.CreatedAt,
		&area.UpdatedAt,
	)
	if err != nil {
		return nil, err
	}

	query = `
	select id, area_id, latitude, longitude, created_at, updated_at 
	from area_edge 
	where area_id = $1
	`
	rows, _ := m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	var areaEdges []AreaEdge
	for rows.Next() {
		var areaEdge AreaEdge
		err = rows.Scan(
			&areaEdge.ID,
			&areaEdge.AreaID,
			&areaEdge.Latitude,
			&areaEdge.Longitude,
			&areaEdge.CreatedAt,
			&areaEdge.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		areaEdges = append(areaEdges, areaEdge)
	}

	area.Edges = areaEdges

	query = `
	select r.id, r.name, r.created_at, r.updated_at
	from 
		area_risk ar 
		left join risk r
		on (ar.risk_id = r.id)
	where ar.area_id = $1
	`
	rows, _ = m.DB.QueryContext(ctx, query, id)
	defer rows.Close()

	var risks []Risk
	for rows.Next() {
		var risk Risk
		err = rows.Scan(
			&risk.ID,
			&risk.Name,
			&risk.CreatedAt,
			&risk.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		risks = append(risks, risk)
	}

	area.Risks = risks

	return &area, nil
}

// All returns all areas and error, if any
func (m *DBModel) AreasAll() ([]*Area, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
	select id, description, created_at, updated_at 
	from area 
	order by description
	`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}

	var areas []*Area
	for rows.Next() {
		var area Area
		err := rows.Scan(
			&area.ID,
			&area.Description,
			&area.CreatedAt,
			&area.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}

		query = `
		select id, area_id, latitude, longitude, created_at, updated_at 
		from area_edge 
		where area_id = $1
		`
		rows, _ := m.DB.QueryContext(ctx, query, area.ID)

		var areaEdges []AreaEdge
		for rows.Next() {
			var areaEdge AreaEdge
			err = rows.Scan(
				&areaEdge.ID,
				&areaEdge.AreaID,
				&areaEdge.Latitude,
				&areaEdge.Longitude,
				&areaEdge.CreatedAt,
				&areaEdge.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			areaEdges = append(areaEdges, areaEdge)
		}
		rows.Close()
		area.Edges = areaEdges

		query = `
		select r.id, r.name, r.created_at, r.updated_at
		from 
			area_risk ar 
			left join risk r
			on (ar.risk_id = r.id)
		where ar.area_id = $1
		`
		rows, _ = m.DB.QueryContext(ctx, query, area.ID)

		var risks []Risk
		for rows.Next() {
			var risk Risk
			err = rows.Scan(
				&risk.ID,
				&risk.Name,
				&risk.CreatedAt,
				&risk.UpdatedAt,
			)
			if err != nil {
				return nil, err
			}
			risks = append(risks, risk)
		}
		rows.Close()
		area.Risks = risks

		areas = append(areas, &area)
	}
	return areas, nil
}

func (m *DBModel) RisksAll() ([]*Risk, error) {
	ctx, cancel := context.WithTimeout(context.Background(), 3*time.Second)
	defer cancel()

	query := `
	select id, name, created_at, updated_at
	from risk 
	order by name
	`
	rows, err := m.DB.QueryContext(ctx, query)
	if err != nil {
		return nil, err
	}
	defer rows.Close()

	var risks []*Risk
	for rows.Next() {
		var risk Risk
		err := rows.Scan(
			&risk.ID,
			&risk.Name,
			&risk.CreatedAt,
			&risk.UpdatedAt,
		)
		if err != nil {
			return nil, err
		}
		risks = append(risks, &risk)
	}

	return risks, nil
}
