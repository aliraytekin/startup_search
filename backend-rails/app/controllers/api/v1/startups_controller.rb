class Api::V1::StartupsController < ApplicationController
  def index
    startups = Startup
    .includes(:location, :application, :contact, :review)
    .yield_self { |rel| params[:q].present? ? rel.search_text(params[:q]) : rel }
    .yield_self { |rel| params[:city].present? ? rel.in_city(params[:city]) : rel }
    .yield_self { |rel| params[:region].present? ? rel.in_region(params[:region]) : rel }
    .yield_self { |rel| params[:country].present? ? rel.in_country(params[:country]) : rel }
    .yield_self { |rel| params[:app_state].present? ? rel.with_app_state(params[:app_state]) : rel }
    .yield_self { |rel| params[:app_category].present? ? rel.with_app_category(params[:app_category]) : rel }
    .yield_self { |rel| params[:contact_state].present? ? rel.with_contact_state(params[:contact_state]) : rel }
    .yield_self { |rel| params[:email_status].present? ? rel.with_contact_email_status(params[:email_status]) : rel }
    .yield_self { |rel| params[:rating].present? ? rel.with_rating(params[:rating]) : rel }

    page = params.fetch(:page, 1).to_i
    per = [params.fetch(:per, 25), 100].min
    startups = startups.offset((page - 1) * per).limit(per)

    render json: startups.as_json(
      include: {
        location: { only: [:city, :region, :country] },
        application: { only: [:state, :category] },
        contact: { only: [:state, :email_status] },
        review: { only: [:rating] }
      },
      only: [:id, :name]
    )
  end

  def create
    startup = Startup.new(startup_params)
    if startup.save
      render json: startup, status: :created
    else
      render json: { errors: startup.errors.full_messages }, status: :unprocessable_content
    end
  end

  private

  def startup_params
    params.require(:startup).permit(
      :name,
      location_attributes: [:country, :region, :city ],
      application_attributes: [:id, :status, :category, :_destroy],
      contact_attributes: [:id, :status, :email_status, :_destroy],
      review_attributes: [:id, :rating, :_destroy])
  end
end
